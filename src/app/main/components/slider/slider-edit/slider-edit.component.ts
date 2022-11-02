import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { SliderService } from 'src/app/main/services/slider/slider.service';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.css']
})
export class SliderEditComponent implements OnInit {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    link: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;
  private id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private sliderService: SliderService,
  ) {
    this.title.setTitle('Sửa slider');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
  }

  public get() {
    this.sliderService.get(this.id).subscribe((response) => {
      console.log(response);
      
    });
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
