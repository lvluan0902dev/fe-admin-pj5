import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { StaffService } from 'src/app/main/services/staff/staff.service';

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.css']
})
export class StaffAddComponent implements OnInit {
  public form = this.fb.group({
    name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    link_linked_in: ['', []],
    link_facebook: ['', []],
    link_instagram: ['', []],
    link_youtube: ['', []],
    image: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private staffService: StaffService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Thêm Nhân viên');
  }

  ngOnInit(): void {
  }

  public save(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();
      var data = this.form.value as any;
      for (let key of Object.keys(data)) {
        formData.append(key, data[key])
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.staffService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.submitted = false;
          this.form.reset();
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
        formData.append(key, data[key])
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.staffService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/staff/list');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
