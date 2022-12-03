import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ProductBrand } from 'src/app/main/models/product-brand/product-brand.model';
import { ProductCategory } from 'src/app/main/models/product-category/product-category.model';
import { Product } from 'src/app/main/models/product/product.model';
import { ProductBrandService } from 'src/app/main/services/product-brand/product-brand.service';
import { ProductCategoryService } from 'src/app/main/services/product-category/product-category.service';
import { ProductService } from 'src/app/main/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  public productCategories: ProductCategory[] = [];
  public productBrands: ProductBrand[] = [];

  public form = this.fb.group({
    product_category: ['', [Validators.required]],
    product_brand: ['', [Validators.required]],
    name: ['', [Validators.required]],
    option_name: ['', [Validators.required]],
    option_price: ['', [Validators.required]],
    option_stock: ['', [Validators.required]],
    image: ['', []],
    short_description: ['', []],
    product_detail: ['', []],
    how_to_use: ['', []],
    ingredients: ['', []],
    status: [true, []],
  });

  public submitted: boolean = false;

  public url = environment.url + '/';
  private id: any;
  private product!: Product;
  public image_name: string = '';
  public image_path: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private fb: FormBuilder,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productBrandService: ProductBrandService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.title.setTitle('Sửa Sản phẩm');
  }

  ngOnInit(): void {
    this.getAllProductCategory();
    this.getAllProductBrand();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.get();
  }

  private getAllProductCategory() {
    this.productCategoryService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.productCategories = response.data;
      }
    });
  }

  private getAllProductBrand() {
    this.productBrandService.getAll().subscribe((response) => {
      if (response.success == 1) {
        this.productBrands = response.data;
      }
    });
  }

  private get() {
    this.productService.get(this.id).subscribe((response) => {
      if (response.success == 1) {
        this.product = response.data;
        this.setImage(this.product.image_name, this.product.image_path);
        this.setForm(this.product);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private setForm(data: any) {
    this.form = this.fb.group({
      product_category: [data.product_category, [Validators.required]],
      product_brand: [data.product_brand, [Validators.required]],
      name: [data.name, [Validators.required]],
      option_name: [data.option_name, [Validators.required]],
      option_price: [data.option_price, [Validators.required]],
      option_stock: [data.option_stock, [Validators.required]],
      image: ['', []],
      short_description: [data.short_description, []],
      product_detail: [data.product_detail, []],
      how_to_use: [data.how_to_use, []],
      ingredients: [data.ingredients, []],
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

      formData.append('id', String(this.product.id));

      this.productService.edit(formData).subscribe((response) => {
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

      formData.append('id', String(this.product.id));

      this.productService.edit(formData).subscribe((response) => {
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
