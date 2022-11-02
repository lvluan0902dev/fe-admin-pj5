import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private title: Title
  ) {
    this.title.setTitle('Đăng nhập');
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    let data = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.login(data).subscribe((response) => {
      this.handleResponsive(response);
    });
  }

  private handleResponsive(data: any) {
    this.tokenService.set(data.access_token);
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
    this.toastService.success('Thành công', 'Đăng nhập thành công');
  }
}
