import { DataProvider } from '../data-providers/interfaces';

export interface DataFetcherProps {
  username: string;
  dataProvider: DataProvider;
  params?: { [key: string]: any };
}
