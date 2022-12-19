import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { User } from 'src/app/main/models/user/user.model';
import { UserService } from 'src/app/main/services/user/user.service';

@Component({
  selector: 'app-change-information',
  templateUrl: './change-information.component.html',
  styleUrls: ['./change-information.component.css']
})
export class ChangeInformationComponent implements OnInit {
  public form = this.fb.group({
    name: ['', [Validators.required]],
    current_password: ['', []],
    new_password: ['', [Validators.minLength(6)]],
  });

  public user!: User;

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {
    this.title.setTitle('Đổi thông tin tài khoản');
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.authService.me().subscribe((response) => {
      this.user = response;
      this.setForm();
    });
  }

  private setForm() {
    this.form = this.fb.group({
      name: [this.user.name, [Validators.required]],
      current_password: ['', []],
      new_password: ['', [Validators.minLength(6)]],
    });
  }

  public save(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();
      var data = this.form.value as any;
      for (let key of Object.keys(data)) {
        if (data[key] == null || data[key] == '') {
          formData.append(key, '');
        } else {
          formData.append(key, data[key]);
        }
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.userService.changeInformation(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.submitted = false;
          this.router.navigateByUrl('/account/change-information');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }

  public saveAndBack(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();
      var data = this.form.value as any;
      for (let key of Object.keys(data)) {
        if (data[key] == null || data[key] == '') {
          formData.append(key, '');
        } else {
          formData.append(key, data[key]);
        }
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.userService.changeInformation(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
