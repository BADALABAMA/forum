import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interface/IUser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @Input() users: IUser[] = [];
  @Input() getData: Function = Function;
  @Output() currentUserChange = new EventEmitter<IUser>();
  name: string = '';
  password: string = '';
  showModal: boolean = false;
  currentUser: IUser | undefined = {
    login: '',
    password: '',
    friends: [],
    isAuthorized: false,
  };

  login(login: string, password: string) {
    this.toggle();

    this.currentUser = this.getByLoginAndPassword(login, password);
    if (this.currentUser) {
      console.log(this.currentUser);
      this.currentUser.isAuthorized = true;
      this.currentUserChange.emit(this.currentUser);
    }
  }
  toggle() {
    this.showModal = !this.showModal;
  }
  getByLoginAndPassword(login: string, password: string): IUser | undefined {
    return this.users.find(
      (user: IUser) => user.login === login && user.password === password
    );
  }
}
