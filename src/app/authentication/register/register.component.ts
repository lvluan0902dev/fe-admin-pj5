import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    let data = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      password_confirmation: this.form.value.password_confirmation,
    };

    this.authService.register(data).subscribe((data) => {
      console.log(data);
    });
  }

}
