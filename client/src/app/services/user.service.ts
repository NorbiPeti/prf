import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { FormControl, ɵFormGroupValue, ɵTypedOrUntyped } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User | undefined;

  get user(): User | undefined {
    return this._user;
  }

  constructor(private http: HttpClient) { }

  async login(username: string, password: string) {
    const user = await firstValueFrom(this.http.post('/api/users/login', {username, password}));
    this._user = user as User;
  }

  async getCurrentUser() {
    try {
      const user = await firstValueFrom(this.http.get('/api/users/status'));
      this._user = user as User;
    } catch (e: any) {
      if (e?.error?.status !== 'NOTOK') {
        console.log("Failed to get user:", e);
      }
      this._user = undefined;
    }
  }

  async logout() {
    try {
      await firstValueFrom(this.http.post('/api/users/logout', {}));
      this._user = undefined;
      return true;
    } catch (e: any) {
      console.log("Failed to log out:", e);
      return false;
    }
  }

  async register(username: string, password: string, birthdate: string) {
    const user = await firstValueFrom(this.http.post('/api/users/register', {username, password, birthdate}));
    console.log("Registered user:", user);
  }

  getList() {
    return this.http.get('/api/users')
  }
}
