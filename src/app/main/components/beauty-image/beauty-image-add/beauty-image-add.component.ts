import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { BeautyImageService } from 'src/app/main/services/beauty-image/beauty-image.service';

@Component({
  selector: 'app-beauty-image-add',
  templateUrl: './beauty-image-add.component.html',
  styleUrls: ['./beauty-image-add.component.css']
})
export class BeautyImageAddComponent implements OnInit {
  public form = this.fb.group({
    image: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private beautyImageService: BeautyImageService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Thêm Hình ảnh đẹp');
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

      this.beautyImageService.add(formData).subscribe((response) => {
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

      this.beautyImageService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/beauty-image/list');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
