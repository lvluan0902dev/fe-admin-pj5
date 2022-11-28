import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Staff } from 'src/app/main/models/staff/staff.model';
import { StaffService } from 'src/app/main/services/staff/staff.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.css']
})
export class StaffEditComponent implements OnInit {
  public form = this.fb.group({
    name: ['', [Validators.required]],
    position: ['', [Validators.required]],
    link_linked_in: ['', []],
    link_facebook: ['', []],
    link_instagram: ['', []],
    link_youtube: ['', []],
    image: ['', []],
    status: [true, []],
  });

  public submitted: boolean = false;
  public url = environment.url + '/';
  private id: any;
  private staff!: Staff;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private staffService: StaffService,
  ) {
    this.title.setTitle('Sửa Nhân viên');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
  }

  public get() {
    this.staffService.get(this.id).subscribe((response) => {
      if (response.success == 1) {
        this.staff = response.data;
        this.setImage(this.staff.image_name, this.staff.image_path);
        this.setForm(this.staff);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
      name: [data.name, [Validators.required]],
      position: [data.position, [Validators.required]],
      link_linked_in: [data.link_linked_in, []],
      link_facebook: [data.link_facebook, []],
      link_instagram: [data.link_instagram, []],
      link_youtube: [data.link_youtube, []],
      image: ['', []],
      status: [data.status == 1 ? true : false, []],
    });
  }

  private setImage(image_name: string, image_path: string) {
    this.image_name = image_name;
    this.image_path = image_path;
  }

  public save(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();

      // Set PUT method
      formData.append('_method', 'PUT');

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

      formData.append('id', String(this.staff.id));

      this.staffService.edit(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.submitted = false;
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

      // Set PUT method
      formData.append('_method', 'PUT');

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

      formData.append('id', String(this.staff.id));

      this.staffService.edit(formData).subscribe((response) => {
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
