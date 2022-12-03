import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Faq } from 'src/app/main/models/faq/faq.model';
import { FaqService } from 'src/app/main/services/faq/faq.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faq-edit',
  templateUrl: './faq-edit.component.html',
  styleUrls: ['./faq-edit.component.css']
})
export class FaqEditComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;
  public url = environment.url + '/';
  private id: any;
  private faq!: Faq;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private faqService: FaqService,
  ) {
    this.title.setTitle('Sửa Câu hỏi thường gặp');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
  }

  private get() {
    this.faqService.get(this.id).subscribe((response) => {
      if (response.success == 1) {
        this.faq = response.data;
        this.setForm(this.faq);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
      title: [data.title, [Validators.required]],
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

      formData.append('id', String(this.faq.id));

      this.faqService.edit(formData).subscribe((response) => {
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

      formData.append('id', String(this.faq.id));

      this.faqService.edit(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/faq/list');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
