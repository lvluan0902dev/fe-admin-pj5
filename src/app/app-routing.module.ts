import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RequestResetComponent } from './authentication/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './authentication/password/response-reset/response-reset.component';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
