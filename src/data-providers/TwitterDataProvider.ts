import axios from 'axios';

import { DataProvider } from './interfaces';

export const TwitterDataProvider: DataProvider = async () => {
  const response = await axios.get(
    '/.netlify/functions/fetch-twitter-data?username=olivvysaur'
  );

  const { ownData, friends } = response.data;

  return {
    ownData,
    friends,
  };
};
