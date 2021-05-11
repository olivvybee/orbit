import axios from 'axios';

import { DataProvider } from './interfaces';

export const TwitterDataProvider: DataProvider = async (username: string) => {
  const response = await axios.get(
    `/.netlify/functions/fetch-twitter-data?username=${username}`
  );

  const { ownData, friends } = response.data;

  return {
    ownData,
    friends,
  };
};
