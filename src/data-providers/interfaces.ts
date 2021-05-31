import { Friend } from '../models';

interface LoadedData {
  result: 'SUCCESS';
  ownData: {
    private: boolean;
    avatarUrl: string;
  };
  friends: Friend[];
}

interface ErrorData {
  result: 'ERROR';
  error: string;
}

export type DataProviderResult = LoadedData | ErrorData;

export type DataProvider = (username: string) => Promise<DataProviderResult>;
