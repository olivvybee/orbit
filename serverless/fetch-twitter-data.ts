import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';
import _countBy from 'lodash/countBy';
import _orderBy from 'lodash/orderBy';
import _chunk from 'lodash/chunk';

export const MAX_TWEETS_ITERATIONS = 5;
export const MAX_LIKES_ITERATIONS = 1;
export const MAX_USERS_ITERATIONS = 3;

const USER_ENDPOINT =
  'https://api.twitter.com/1.1/users/lookup.json?screen_name=';
const LIKES_ENDPOINT =
  'https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=';
const TWEETS_ENDPOINT =
  'https://api.twitter.com/1.1/statuses/user_timeline.json?count=200&screen_name=';
const USER_LOOKUP_ENDPOINT =
  'https://api.twitter.com/1.1/users/lookup.json?user_id=';

const headers = {
  Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
};

interface Event {
  queryStringParameters: {
    username?: string;
    ignoreLikes?: string;
  };
}

export const fetchTwitterData = async (event: Event) => {
  try {
    const username = event.queryStringParameters.username?.toLowerCase() || '';
    const ignoreLikes = event.queryStringParameters.ignoreLikes === 'true';

    const userResponse = await axios.get(`${USER_ENDPOINT}${username}`, {
      headers,
    });
    const ownData = extractUserInfo(userResponse.data[0]);

    if (ownData.private) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ownData: {
            private: true,
          },
        }),
      };
    }

    let usersData: UserSummary[] = [];

    const [likes, tweets] = await Promise.all([
      ignoreLikes ? Promise.resolve([]) : fetchLikes(username),
      fetchTweets(username),
    ]);

    const likedUserIds = _countBy(likes.map((tweet) => tweet.user.id_str));
    usersData = usersData.concat(
      likes.map((tweet) => extractUserInfo(tweet.user))
    );

    const mentions = tweets.filter(
      (tweet) =>
        tweet.in_reply_to_user_id &&
        tweet.user.screen_name.toLowerCase() === username &&
        tweet.in_reply_to_screen_name.toLowerCase() !== username
    );
    const mentionedUserIds = _countBy(
      mentions.map((tweet) => tweet.in_reply_to_user_id_str)
    );
    const uniqueMentionedUserIds = Object.keys(mentionedUserIds);

    const retweets = tweets.filter(
      (tweet) =>
        tweet.retweeted_status &&
        tweet.retweeted_status.user.screen_name.toLowerCase() !== username
    );
    const retweetedUserIds = _countBy(
      retweets.map((tweet) => tweet.retweeted_status.user.id_str)
    );
    usersData = usersData.concat(
      retweets.map((tweet) => extractUserInfo(tweet.retweeted_status.user))
    );

    const quotes = tweets.filter(
      (tweet) =>
        tweet.is_quote_status &&
        tweet.quoted_status &&
        tweet.user.screen_name.toLowerCase() === username &&
        tweet.quoted_status.user.screen_name.toLowerCase() !== username
    );
    const quotedUserIds = _countBy(
      quotes.map((tweet) => tweet.quoted_status.user.id_str)
    );
    usersData = usersData.concat(
      quotes.map((tweet) => extractUserInfo(tweet.quoted_status.user))
    );

    const mentionedUsers = await fetchMentionedUsers(uniqueMentionedUserIds);
    usersData = usersData.concat(mentionedUsers);

    const uniqueUsers = _uniqBy(usersData, 'id').filter(
      (user) => !user.private && user.username.toLowerCase() !== username
    );

    const friendsWithScores = uniqueUsers.map((user) => {
      const { id } = user;

      const likeScore = likedUserIds[id] || 0;
      const mentionScore = mentionedUserIds[id] || 0;
      const quoteScore = quotedUserIds[id] || 0;
      const retweetScore = retweetedUserIds[id] || 0;

      const score =
        likeScore + 3 * mentionScore + 2 * quoteScore + retweetScore;

      return {
        ...user,
        score,
      };
    });

    const friends = _orderBy(friendsWithScores, 'score', ['desc']);

    return {
      statusCode: 200,
      body: JSON.stringify({
        ownData,
        friends,
      }),
    };
  } catch (error) {
    if (error.response) {
      const {
        status,
        statusText,
        config: { url },
        headers,
      } = error.response;

      console.error(`Error ${status} fetching URL ${url} - ${statusText}`);

      const rateLimitResetTime = Number(headers['x-rate-limit-reset']) * 1000;

      if (status === 429) {
        console.log(
          `Rate limit resets at ${new Date(rateLimitResetTime).toISOString()}`
        );
      }

      return {
        statusCode: 500,
        body: JSON.stringify({
          status,
          statusText,
          rateLimitResetTime,
        }),
      };
    }

    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};

const fetchLikes = async (username: string) => {
  let likes: any[] = [];
  let previousId = undefined;
  for (let i = 0; i < MAX_LIKES_ITERATIONS; i++) {
    let url = `${LIKES_ENDPOINT}${username}`;
    if (previousId) {
      url += `&max_id=${previousId}`;
    }

    const likesResponse = await axios.get(url, {
      headers,
    });

    const lowestId = likesResponse.data.map((tweet) => tweet.id).sort()[0];
    if (lowestId === previousId) {
      break;
    }

    likes = likes.concat(likesResponse.data);
    previousId = lowestId;
  }
  return likes.filter(
    (tweet) => tweet.user.screen_name.toLowerCase() !== username
  );
};

const fetchTweets = async (username: string) => {
  let tweets: any[] = [];
  let previousId = undefined;
  for (let i = 0; i < MAX_TWEETS_ITERATIONS; i++) {
    let url = `${TWEETS_ENDPOINT}${username}`;
    if (previousId) {
      url += `&max_id=${previousId}`;
    }

    const tweetsResponse = await axios.get(url, {
      headers,
    });

    const lowestId = tweetsResponse.data.map((tweet) => tweet.id).sort()[0];
    if (lowestId === previousId) {
      break;
    }

    tweets = tweets.concat(tweetsResponse.data);
    previousId = lowestId;
  }
  return tweets;
};

const fetchMentionedUsers = async (userIds: string[]) => {
  const batches = _chunk(userIds, 100);

  const requests = batches.map(async (batch) => {
    const usersResponse = await axios.get(
      `${USER_LOOKUP_ENDPOINT}${batch.join(',')}`,
      {
        headers,
      }
    );
    return usersResponse.data.map(extractUserInfo);
  });

  const batchedResults = await Promise.all(requests);
  return batchedResults.reduce((combined, batch) => combined.concat(batch), []);
};

interface UserSummary {
  id: string;
  private: boolean;
  avatarUrl: string;
  username: string;
  url: string;
}

const extractUserInfo = (user: any): UserSummary => ({
  id: user.id_str,
  private: user.protected,
  avatarUrl: user.profile_image_url_https.replace('_normal', ''),
  username: user.screen_name,
  url: `https://twitter.com/${user.screen_name}`,
});

export const handler = middy(fetchTwitterData)
  .use(httpEventNormalizer())
  .use(httpErrorHandler());
