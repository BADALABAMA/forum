import { IMessage } from './IMessage';

export interface IUser {
  login: string;
  password?: string;
  messages?: IMessage[];
  friends?: string[];
  img?: string;
  isAuthorized?: boolean;
}
