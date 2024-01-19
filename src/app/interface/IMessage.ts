import { IUser } from './IUser';

export interface IMessage {
  from: string | IUser;
  avatar: string | undefined;
  to: string | IUser;
  date: Date;
  message: string;
}
