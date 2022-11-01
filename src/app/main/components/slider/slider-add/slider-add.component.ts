import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, Validators } from '@angular/forms';
import { SliderService } from 'src/app/main/services/slider/slider.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    link: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: [true, []],
  })

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private sliderService: SliderService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Thêm Slider');
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

      this.sliderService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Added successfully', response.message);
          this.submitted = false;
          this.form.reset();
        } else {
          this.toastService.error('Have something error', response.message);
        }
      });
    } else {
      console.log(this.form);
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

      this.sliderService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Success', response.message);
          this.router.navigateByUrl('/slider/list');
        } else {
          this.toastService.error('Error', response.message);
        }
      });
    } else {
      console.log(this.form);
    }
  }
}
