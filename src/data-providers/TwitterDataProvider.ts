import axios from 'axios';

import { DataProvider } from './interfaces';

export const TwitterDataProvider: DataProvider = async (username: string) => {
  try {
    const response = await axios.get(
      `/.netlify/functions/fetch-twitter-data?username=${username}`
    );

    const { ownData, friends } = response.data;

    return {
      result: 'SUCCESS',
      ownData,
      friends,
    };
  } catch (error) {
    if (error.response && error.response.data.status) {
      const { status } = error.response.data;

      if (status === 404) {
        return {
          result: 'ERROR',
          error: 'User not found.',
        };
      }

      if (status === 429) {
        return {
          result: 'ERROR',
          error: 'Orbit is overloaded. Please try again in a few minutes.',
        };
      }

      return {
        result: 'ERROR',
        error: `Twitter returned error code ${status}.`,
      };
    }

    return {
      result: 'ERROR',
      error: 'Unable to contact twitter.',
    };
  }
};
