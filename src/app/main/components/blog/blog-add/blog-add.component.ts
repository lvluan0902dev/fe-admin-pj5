import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { BlogCategory } from 'src/app/main/models/blog-category/blog-category.model';
import { BlogCategoryService } from 'src/app/main/services/blog-category/blog-category.service';
import { BlogService } from 'src/app/main/services/blog/blog.service';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  public blogCategories: BlogCategory[] = [];

  public form = this.fb.group({
    blog_category: ['', [Validators.required]],
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    image: ['', [Validators.required]],
    status: [true, []],
  });

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private blogService: BlogService,
    private blogCategoryService: BlogCategoryService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Thêm Bài viết');
  }

  ngOnInit(): void {
    this.getAllBlogCategory();
  }

  private getAllBlogCategory() {
    this.blogCategoryService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.blogCategories = response.data;
      }
    });
  }

  public save(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();
      var data = this.form.value as any;
      for (let key of Object.keys(data)) {
        if (key == 'blog_category') {
          formData.append('blog_category_id', data[key]['id']);
          continue;
        }

        if (data[key] == null || data[key] == '') {
          formData.append(key, '');
        } else {
          formData.append(key, data[key]);
        }
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.blogService.add(formData).subscribe((response) => {
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
        if (key == 'blog_category') {
          formData.append('blog_category_id', data[key]['id']);
          continue;
        }

        if (data[key] == null || data[key] == '') {
          formData.append(key, '');
        } else {
          formData.append(key, data[key]);
        }
      }
      if (files?.length) {
        formData.set('image', files[0]);
      }

      this.blogService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/blog/list');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
