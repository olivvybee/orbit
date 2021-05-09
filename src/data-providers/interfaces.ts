import { Friend } from '../models';

export type DataProvider = (username: string) => Promise<Friend[]>;
