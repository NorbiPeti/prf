import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    canMatch: [() => !!inject(UserService).user],
    children: [
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: ':id',
        component: ProductEditComponent
      },
      {
        path: '',
        component: ProductListComponent
      }
    ]
  },
  {
    path: '',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', component: ProductListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
