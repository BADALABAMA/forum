import { Injectable } from '@angular/core';
import { IUser } from './interface/IUser';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private currentUser: IUser = {
    login: '',
    password: '',
    friends: [],
    messages: [],
    isAuthorized: false,
  };
  private sendignToUser: IUser = {
    login: '',
    password: '',
    friends: [],
    messages: [],
    isAuthorized: false,
  };
  constructor() {}

  getCurrentUser(): IUser {
    return this.currentUser;
  }
  setCurrentUser(user: IUser): void {
    this.currentUser = user;
  }

  getSendingToUser() {
    return this.sendignToUser;
  }

  setSendingToUser(sendignToUser: IUser) {
    this.sendignToUser = sendignToUser;
  }
}
