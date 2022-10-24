import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';
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
    private loginService: LoginService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    let data = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.loginService.login(data).subscribe((data) => {
      this.handleResponsive(data);
    });
  }

  private handleResponsive(data: any) {
    this.tokenService.set(data.access_token);
  }
}
