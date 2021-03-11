import { IUser } from './user.interface';

export interface IUserResponse {
  results: IUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}
