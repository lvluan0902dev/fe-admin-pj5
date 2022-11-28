import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { BeautyImage } from 'src/app/main/models/beauty-image/beauty-image.model';
import { BeautyImageService } from 'src/app/main/services/beauty-image/beauty-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beauty-image-edit',
  templateUrl: './beauty-image-edit.component.html',
  styleUrls: ['./beauty-image-edit.component.css']
})
export class BeautyImageEditComponent implements OnInit {
  public form = this.fb.group({
    image: ['', []],
    status: [true, []],
  });

  public submitted: boolean = false;
  public url = environment.url + '/';
  private id: any;
  private beautyImage!: BeautyImage;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private beautyImageService: BeautyImageService,
  ) {
    this.title.setTitle('Sửa slider');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
  }

  public get() {
    this.beautyImageService.get(this.id).subscribe((response) => {
      if (response.success == 1) {
        this.beautyImage = response.data;
        this.setImage(this.beautyImage.image_name, this.beautyImage.image_path);
        this.setForm(this.beautyImage);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
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

      formData.append('id', String(this.beautyImage.id));

      this.beautyImageService.edit(formData).subscribe((response) => {
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

      formData.append('id', String(this.beautyImage.id));

      this.beautyImageService.edit(formData).subscribe((response) => {
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
