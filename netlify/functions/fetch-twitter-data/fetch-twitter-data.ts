import { Handler } from '@netlify/functions';
import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';
import _countBy from 'lodash/countBy';
import _orderBy from 'lodash/orderBy';

const USER_ENDPOINT =
  'https://api.twitter.com/1.1/users/lookup.json?screen_name=';
const LIKES_ENDPOINT =
  'https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=';
const TWEETS_ENDPOINT =
  'https://api.twitter.com/1.1/statuses/user_timeline.json?count=200&screen_name=';
const USER_LOOKUP_ENDPOINT =
  'https://api.twitter.com/1.1/users/lookup.json?user_id=';

const MAX_TWEETS_ITERATIONS = 5;
const MAX_LIKES_ITERATIONS = 3;

const headers = {
  Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
};

const extractUserInfo = (user: any) => ({
  id: user.id_str,
  private: user.protected,
  avatarUrl: user.profile_image_url_https.replace('_normal', ''),
  username: user.screen_name,
});

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export const handler: Handler = async (event) => {
  try {
    const username = event.queryStringParameters.username;

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

    let usersData = [];

    let likes = [];
    let previousLikeId = undefined;
    for (let i = 0; i < MAX_LIKES_ITERATIONS; i++) {
      let url = `${LIKES_ENDPOINT}${username}`;
      if (previousLikeId) {
        url += `&max_id=${previousLikeId}`;
      }

      const likesResponse = await axios.get(url, {
        headers,
      });

      const lowestId = likesResponse.data.map((tweet) => tweet.id).sort()[0];
      if (lowestId === previousLikeId) {
        break;
      }

      likes = likes.concat(likesResponse.data);
      previousLikeId = lowestId;
    }

    const likedUserIds = _countBy(likes.map((tweet) => tweet.user.id_str));
    usersData = usersData.concat(
      likes.map((tweet) => extractUserInfo(tweet.user))
    );

    let tweets = [];
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

    const mentions = tweets.filter(
      (tweet) =>
        tweet.in_reply_to_user_id &&
        tweet.user.screen_name === username &&
        tweet.in_reply_to_screen_name !== username
    );
    const mentionedUserIds = _countBy(
      mentions.map((tweet) => tweet.in_reply_to_user_id_str)
    );
    const uniqueMentionedUserIds = Object.keys(mentionedUserIds);

    const retweets = tweets.filter(
      (tweet) =>
        tweet.retweeted_status &&
        tweet.retweeted_status.user.screen_name !== username
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
        tweet.user.screen_name === username &&
        tweet.quoted_status.user.screen_name !== username
    );
    const quotedUserIds = _countBy(
      quotes.map((tweet) => tweet.quoted_status.user.id_str)
    );
    usersData = usersData.concat(
      quotes.map((tweet) => extractUserInfo(tweet.quoted_status.user))
    );

    const mentionedUsersResponse = await axios.get(
      `${USER_LOOKUP_ENDPOINT}${uniqueMentionedUserIds.slice(0, 99).join(',')}`,
      { headers }
    );
    usersData = usersData.concat(
      mentionedUsersResponse.data.map(extractUserInfo)
    );

    const uniqueUsers = _uniqBy(usersData, 'id').filter(
      (user) => !user.private
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
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
