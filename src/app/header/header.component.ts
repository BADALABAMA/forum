import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interface/IUser';
import { DataService } from '../data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Input() saveData: Function = Function;
  @Input() getData: Function = Function;
  currentUser: IUser = { login: '', password: '', messages: [], friends: [] };
  selectedUser: IUser = { login: 'user1', messages: [] };
  userLogin: string = '';
  showBtnTitle: string = 'Sign up';

  userAuthorized: boolean = false;
  showModalLogin: boolean = false;
  showModalRegister: boolean = false;
  showInputs: boolean = false;

  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}

  showLogin() {
    this.showModalLogin = !this.showModalLogin;
  }
  showRegister() {
    this.showModalRegister = !this.showModalRegister;
  }
  showInput() {
    this.showInputs = !this.showInputs;
  }

  sendMessage() {
    const newMessage = this.userService.sendMessage(
      this.currentUser,
      this.selectedUser,
      {
        from: this.currentUser.login,
        avatar: this.currentUser.img,
        to: this.selectedUser,
        date: new Date(),
        message: 'Message send',
      }
    );

    console.log(newMessage);
    console.log(this.users);
  }
  invokeSaveFriendsData(key: string, value: string[] | undefined) {
    if (this.saveData) {
      this.saveData(`${key} Friends : `, value);
    }
  }
  addFriend(userLogin: string) {
    this.userService.addFriend(
      {
        login: userLogin,
      },
      this.currentUser
    );

    this.invokeSaveFriendsData(
      this.currentUser.login,
      this.currentUser.friends
    );

    this.userLogin = '';
  }

  handleCurrentUserChange(user: IUser) {
    this.dataService.setCurrentUser(user);

    if (user.login !== '') {
      this.userAuthorized = true;
      this.currentUser = user;
    }
  }

  logOut() {
    this.currentUser = { login: '', password: '' };
    this.userAuthorized = false;
    console.log(this.currentUser);
  }

  ngOnInit(): void {}
}
