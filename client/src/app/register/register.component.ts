import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    birthdate: new FormControl()
  });

  constructor(private userService: UserService, private router: Router) {
  }

  async doRegister() {
    const val = this.form.value;
    await this.userService.register(val.username, val.password, val.birthdate);
    await this.router.navigate(['/']);
  }
}
