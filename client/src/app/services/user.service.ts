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
      if (e?.error?.error?.status !== 'NOTOK') {
        console.log("Failed to get user:", e);
      }
      this._user = undefined;
    }
  }
}
