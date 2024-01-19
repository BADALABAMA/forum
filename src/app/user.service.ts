import { Injectable } from '@angular/core';
import { IUser } from './interface/IUser';

import { IMessage } from './interface/IMessage';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: IUser[] = [
    {
      login: 'user1',
      password: '123',
      messages: [],
      friends: [],
      img: 'assets/ea7a3c32163929.567197ac70bda.png',
    },
    {
      login: 'user2',
      password: '123',
      messages: [],
      friends: [],
      img: 'assets/ea7a3c32163929.567197ac70bda.png',
    },
    {
      login: 'user3',
      password: '123',
      messages: [],
      friends: [],
      img: 'assets/ea7a3c32163929.567197ac70bda.png',
    },
  ];
  private friends: string[] = [];
  private messages: IMessage[] = [];
  constructor() {}

  public getAllUsers() {
    return this.users;
  }

  public getFriends(): string[] {
    return this.friends;
  }
  public getMessages(): IMessage[] {
    return this.messages;
  }

  public getLogin(user: IUser) {
    return this.users.find((u) => {
      u.login === user.login;
    });
  }

  public addUser(user: IUser) {
    return this.users.push(user);
  }
  public addFriend(user: IUser, currentUser: IUser): string[] | undefined {
    const existingUser = this.users.find((u) => u.login === user.login);

    if (!existingUser) {
      console.log(`user not exist with login:${user.login}`);
    } else {
      const existingFriend = this.friends.includes(user.login);

      if (!existingFriend) {
        this.friends.push(user.login);
        existingUser.friends = [currentUser.login];
        currentUser.friends = [...this.friends];
        console.log('success add friend:' + existingUser.login);
      }
    }

    return existingUser ? existingUser.friends && existingUser.friends : [];
  }

  public sendMessage(
    fromUser: IUser,
    toUser: IUser,
    message: IMessage
  ): IMessage[] | undefined {
    const existingUser = this.users.find((u) => u.login === toUser.login);

    if (!existingUser) {
      console.log(`user not exist with login:${toUser}`);
    } else {
      if (existingUser) {
        this.messages.push(message);
        existingUser.messages = [...this.messages];
        fromUser.messages = [...this.messages];
        console.log('success send message to :' + existingUser.login);
      }
    }

    return existingUser ? existingUser?.messages && existingUser?.messages : [];
  }
}
