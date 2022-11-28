import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ContactSetting } from 'src/app/main/models/contact-setting/contact-setting.model';
import { ContactSettingService } from 'src/app/main/services/contact-setting/contact-setting.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  public form = this.fb.group({
    content: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;
  public url = environment.url + '/';
  private title_obj: any;
  private contactSetting!: ContactSetting;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private contactSettingService: ContactSettingService,
  ) {
    this.title.setTitle('Google Maps');
  }

  ngOnInit(): void {
    this.title_obj = 'google_maps';
    this.get();
  }

  public get() {
    this.contactSettingService.get(this.title_obj).subscribe((response) => {
      if (response.success == 1) {
        this.contactSetting = response.data;
        this.setForm(this.contactSetting);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
      content: [data.content, [Validators.required]],
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

      formData.append('id', String(this.contactSetting.id));

      this.contactSettingService.edit(formData).subscribe((response) => {
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
}
