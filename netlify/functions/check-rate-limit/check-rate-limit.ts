import { Handler } from '@netlify/functions';
import axios from 'axios';

import {
  MAX_USERS_ITERATIONS,
  MAX_LIKES_ITERATIONS,
  MAX_TWEETS_ITERATIONS,
} from '../constants';

const ENDPOINT =
  'https://api.twitter.com/1.1/application/rate_limit_status.json';

const RESOURCES = 'users,favorites,statuses';

const headers = {
  Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
};

export const handler: Handler = async (event) => {
  try {
    const response = await axios.get(`${ENDPOINT}?resources=${RESOURCES}`, {
      headers,
    });

    const {
      resources: { users, favorites, statuses },
    } = response.data;

    const { remaining: userLookupsRemaining, reset: userLookupsReset } =
      users['/users/lookup'];

    const canLookupUsers = userLookupsRemaining >= MAX_USERS_ITERATIONS * 2;

    const { remaining: likesLookupsRemaining, reset: likesLookupsReset } =
      favorites['/favorites/list'];

    const canLookupLikes = likesLookupsRemaining >= MAX_LIKES_ITERATIONS * 2;

    const { remaining: tweetsLookupsRemaining, reset: tweetsLookupsReset } =
      statuses['/statuses/user_timeline'];

    const canLookupTweets = tweetsLookupsRemaining >= MAX_TWEETS_ITERATIONS * 2;

    const available = canLookupUsers && canLookupLikes && canLookupTweets;

    const resetTime =
      Math.max(userLookupsReset, likesLookupsReset, tweetsLookupsReset) * 1000;

    console.log({
      userLookupsRemaining,
      likesLookupsRemaining,
      tweetsLookupsRemaining,
      resetTime,
    });

    return { statusCode: 200, body: JSON.stringify({ available, resetTime }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.toString() };
  }
};
