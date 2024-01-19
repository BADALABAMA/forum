import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { IUser } from '../interface/IUser';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrl: './app-container.component.scss',
})
export class AppContainerComponent {
  constructor(private userService: UserService) {}
  showBtn: boolean = false;

  users: IUser[] = this.userService.getAllUsers();
  saveData(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getData(key: string) {
    localStorage.getItem(key);
  }
}
