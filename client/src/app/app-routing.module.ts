import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCheck } from './auth-check';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthCheck],
    children: [
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: ':id',
        component: ProductEditComponent
      }
    ]
  },
  {
    path: '',
    children: [
      {path: '', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export type RouteData = { title: string; };
