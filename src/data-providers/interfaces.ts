import { Friend } from '../models';

export type DataProvider = (
  username: string
) => Promise<{
  ownData: {
    private: boolean;
    avatarUrl: string;
  };
  friends: Friend[];
}>;
