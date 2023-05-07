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
  toggle = false;

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit() {
    if (!this.userService.user) {
      this.userService.getCurrentUser();
    }
  }

  async logout() {
    if (await this.userService.logout()) {
      await this.router.navigate(['/']);
    }
  }
}
