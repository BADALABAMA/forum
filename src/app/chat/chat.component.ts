import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IUser } from '../interface/IUser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  currentUser: IUser = this.dataService.getCurrentUser();
  users: IUser[] = this.userService.getAllUsers();
  selectedUser: IUser = { login: '', messages: [] };
  message: string = '';
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  showUser() {
    console.log(this.selectedUser);
  }

  sendMessage() {
    if (
      this.selectedUser.login !== this.currentUser.login &&
      this.message != ''
    ) {
      const newMessage = this.userService.sendMessage(
        this.currentUser,
        this.selectedUser,
        {
          from: this.currentUser.login,
          avatar: this.currentUser.img,
          to: this.selectedUser,
          date: new Date(),
          message: this.message,
        }
      );
      this.message = '';

      console.log(newMessage);
      console.log(this.users);
      this.sendReplyMessage();
    }
  }

  sendReplyMessage() {
    setTimeout(() => {
      const newMessage = this.userService.sendMessage(
        this.selectedUser,
        this.currentUser,

        {
          from: this.selectedUser.login,
          avatar: this.selectedUser.img,
          to: this.currentUser.login,
          date: new Date(),
          message: 'MESSAGE WORKS 22!',
        }
      );
      console.log(newMessage);
      console.log(this.selectedUser.messages);
    }, 5000);
  }

  handleCurrentUserChange() {
    this.currentUser = this.dataService.getCurrentUser();
    this.currentUser.isAuthorized = true;
  }
  ngOnInit(): void {}
}
