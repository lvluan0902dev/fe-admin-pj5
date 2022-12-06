import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { BlogCategory } from 'src/app/main/models/blog-category/blog-category.model';
import { Blog } from 'src/app/main/models/blog/blog.model';
import { BlogCategoryService } from 'src/app/main/services/blog-category/blog-category.service';
import { BlogService } from 'src/app/main/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public blogCategories: BlogCategory[] = [];

  public form = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    blog_category: ['', [Validators.required]],
    image: ['', []],
    status: [true, []],
  });

  public submitted: boolean = false;
  public url = environment.url + '/';
  private id: any;
  private blog!: Blog;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private blogService: BlogService,
    private blogCategoryService: BlogCategoryService,
  ) {
    this.title.setTitle('Sửa Bài viết');
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
    this.getAllBlogCategory();
  }

  private getAllBlogCategory() {
    this.blogCategoryService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.blogCategories = response.data;
      }
    });
  }

  private get() {
    this.blogService.get(this.id).subscribe((response) => {
      if (response.success == 1) {
        this.blog = response.data;
        this.setImage(this.blog.image_name, this.blog.image_path);
        this.setForm(this.blog);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
      title: [data.title, [Validators.required]],
      content: [data.content, [Validators.required]],
      blog_category: [data.blog_category, [Validators.required]],
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

      formData.append('id', String(this.blog.id));

      this.blogService.edit(formData).subscribe((response) => {
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

      formData.append('id', String(this.blog.id));

      this.blogService.edit(formData).subscribe((response) => {
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
