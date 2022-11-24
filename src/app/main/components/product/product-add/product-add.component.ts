import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ProductBrand } from 'src/app/main/models/product-brand/product-brand.model';
import { ProductCategory } from 'src/app/main/models/product-category/product-category.model';
import { ProductBrandService } from 'src/app/main/services/product-brand/product-brand.service';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { ProductService } from 'src/app/main/services/product/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  public productCategories: ProductCategory[] = [];
  public productBrands: ProductBrand[] = [];

  public form = this.fb.group({
    product_category: ['', [Validators.required]],
    product_brand: ['', [Validators.required]],
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    short_description: ['', []],
    product_detail: ['', []],
    how_to_use: ['', []],
    ingredients: ['', []],
    status: [true, []],
  });

  public submitted: boolean = false;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Thêm Sản phẩm');
  }

  ngOnInit(): void {
    this.getAllProductCategory();
    this.getAllProductBrand();
  }

  public getAllProductCategory() {
    this.productCategoryService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.productCategories = response.data;
      }
    });
  }

  public getAllProductBrand() {
    this.productBrandService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.productBrands = response.data;
      }
    });
  }

  public save(files: FileList | null) {
    this.submitted = true;
    if (this.form.status == 'VALID') {
      var formData = new FormData();
      var data = this.form.value as any;
      for (let key of Object.keys(data)) {
        if (key == 'product_category') {
          formData.append('product_category_id', data[key]['id']);
          continue;
        } else if (key == 'product_brand') {
          formData.append('product_brand_id', data[key]['id']);
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

      this.productService.add(formData).subscribe((response) => {
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
        if (key == 'product_category') {
          formData.append('product_category_id', data[key]['id']);
          continue;
        } else if (key == 'product_brand') {
          formData.append('product_brand_id', data[key]['id']);
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

      this.productService.add(formData).subscribe((response) => {
        if (response.success == 1) {
          this.toastService.success('Thành công', response.message);
          this.router.navigateByUrl('/product/list');
        } else {
          this.toastService.error('Lỗi', response.message);
        }
      });
    } else {
      // Do something
    }
  }
}
