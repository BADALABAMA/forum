import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interface/IUser';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  constructor(private userService: UserService) {}

  @Input() users: IUser[] = [];
  @Input() saveData: Function = Function;
  showModal: boolean = false;
  name: string = '';
  password: string = '';
  user: IUser = { login: '', password: '', friends: [] };

  invokeSaveData() {
    if (this.saveData) {
      this.saveData('Users', this.userService.getAllUsers());
    }
  }
  toggle() {
    this.showModal = !this.showModal;
  }
  registerNewUser() {
    if (this.name !== '' && this.password !== '') {
      this.user = {
        login: this.name,
        password: this.password,
        friends: [],
        img: 'assets/ea7a3c32163929.567197ac70bda.png',
        isAuthorized: false,
      };

      this.userService.addUser(this.user);
      this.invokeSaveData();
      this.toggle();
    }
  }
  clearData() {
    localStorage.clear();
  }
}
