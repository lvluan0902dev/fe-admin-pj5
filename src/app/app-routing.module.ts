import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RequestResetComponent } from './authentication/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './authentication/password/response-reset/response-reset.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
