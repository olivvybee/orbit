import axios from 'axios';

import { DataProvider, DataProviderResult } from './interfaces';

const API_URL =
  'https://p7xbt3z3zk.execute-api.eu-west-2.amazonaws.com/fetch-twitter-data';
const LOCAL_STORAGE_KEY = 'orbitRateLimitReset';

export const TwitterDataProvider: DataProvider = async (username, params) => {
  const now = new Date().getTime();
  const storedRateLimitResetTime = Number(
    window.localStorage.getItem(LOCAL_STORAGE_KEY) || 0
  );

  if (now < storedRateLimitResetTime) {
    return getRateLimitError(now, storedRateLimitResetTime);
  }

  try {
    const ignoreLikesParam =
      params && params.ignoreLikes ? '&ignoreLikes=1' : '';

    const response = await axios.get(
      `${API_URL}?username=${username}${ignoreLikesParam}`
    );

    const { ownData, friends } = response.data;

    return {
      result: 'SUCCESS',
      ownData,
      friends,
    };
  } catch (error: any) {
    if (error.response && error.response.data.status) {
      const { status } = error.response.data;

      if (status === 404) {
        return {
          result: 'ERROR',
          error: 'User not found.',
        };
      }

      if (status === 429) {
        const { rateLimitResetTime } = error.response.data;

        window.localStorage.setItem('orbitRateLimitReset', rateLimitResetTime);

        const now = new Date().getTime();
        return getRateLimitError(now, rateLimitResetTime);
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

const getRateLimitError = (
  timeNow: number,
  rateLimitResetTime: number
): DataProviderResult => {
  const minutesUntilRefresh = Math.ceil(
    (rateLimitResetTime - timeNow) / (60 * 1000)
  );
  const minutesUnit = minutesUntilRefresh === 1 ? 'minute' : 'minutes';

  return {
    result: 'ERROR',
    error: `Orbit is overloaded. Twitter limits the number of requests the app can make. The limit will reset in ${minutesUntilRefresh} ${minutesUnit}.`,
  };
};
