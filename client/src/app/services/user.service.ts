import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User | undefined;

  get user() {
    return this._user;
  }

  constructor() { }

  login() {

  }
}
