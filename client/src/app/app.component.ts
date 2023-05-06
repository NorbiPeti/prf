import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  toggle = false;

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit() {
    if (!this.userService.user) {
      this.userService.getCurrentUser();
    }
  }

  async doLogin() {
    try {
      await this.userService.login(this.loginForm.value.username, this.loginForm.value.password);
    } catch (e: any) {
      console.log("Hiba:", e);
      alert("Hiba: " + (e?.error?.error ?? JSON.stringify(e)));
    }
  }

  async doRegister() {
  }
}
