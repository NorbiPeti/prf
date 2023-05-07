import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(public userService: UserService, private router: Router) {
  }


  async doLogin() {
    try {
      await this.userService.login(this.loginForm.value.username, this.loginForm.value.password);
      await this.router.navigate(['/']);
    } catch (e: any) {
      console.log("Hiba:", e);
      alert("Hiba: " + (e?.error?.error ?? JSON.stringify(e)));
    }
  }
}
