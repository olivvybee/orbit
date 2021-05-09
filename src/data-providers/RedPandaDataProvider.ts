import { Friend } from '../models';

import { DataProvider } from './interfaces';

export const RedPandaDataProvider: DataProvider = async () => {
  const friends: Friend[] = [];
  const now = new Date();

  for (let i = 0; i < 100; i++) {
    friends.push({
      id: i.toString(),
      username: `red-panda-${i}`,
      avatarUrl: `/red-panda.jpg?${now.getTime()}`,
      score: 0,
    });
  }

  return {
    ownData: {
      private: false,
      avatarUrl: `/red-panda-flipped.jpg?${now.getTime()}`,
    },
    friends,
  };
};
