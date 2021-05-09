import { Friend } from '../models';

export type DataProvider = (
  username: string
) => Promise<{
  ownAvatarUrl: string;
  friends: Friend[];
}>;
