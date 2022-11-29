import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { ProductImage } from 'src/app/main/models/product-image/product-image.model';
import { ProductOption } from 'src/app/main/models/product-option/product-option.model';
import { Product } from 'src/app/main/models/product/product.model';
import { ProductService } from 'src/app/main/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public url = environment.url + '/';
  public apiUrl = environment.apiUrl + '/';
  public datas: Product[] = [];
  public totalResult: number = 0;
  public total: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';

  public productId = 0;

  // Product Image
  public productImageDialog: boolean = false;
  public productImageDatas: ProductImage[] = [];
  public productImageTotalResult: number = 0;
  public productImageTotal: number = 0;
  public productImageLoading: boolean = true;
  public productImageEvent: any;

  // Product Option
  public productOptionDialog: boolean = false;
  public productOptionDatas: ProductOption[] = [];
  public productOptionTotalResult: number = 0;
  public productOptionTotal: number = 0;
  public productOptionLoading: boolean = true;
  public productOptionEvent: any;
  public productOptionForm = this.fb.group({
    name: ['', [Validators.required]],
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
  });
  public productOptionSubmitted: boolean = false;
  public productOptionId: number = 0;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private title: Title,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this.title.setTitle('Danh sách Sản phẩm');
  }

  ngOnInit(): void {

  }

  public load(event: LazyLoadEvent) {
    this.setLoadingStatus(true);
    this.event = event;
    this.event.searchInput = this.search_input;
    setTimeout(() => {
      this.loadData();
    }, 1000);
  }

  public search(value: string) {
    this.setLoadingStatus(true);
    this.search_input = value;
    this.event.searchInput = this.search_input;
    this.loadData();
  }

  private loadData() {
    this.productService.list(this.event).subscribe((response) => {
      this.datas = response.data;
      this.totalResult = response.total_result;
      this.total = response.total;
      this.setLoadingStatus(false);
    });
  }

  public delete(id: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá?',
      header: 'Xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.delete(id).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.setLoadingStatus(true);
            this.loadData();
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      },
      reject: () => {

      },
      key: "topDialog"
    });
  }

  private setLoadingStatus(status: boolean) {
    this.loading = status;
  }

  // Product Image
  public showProductImageDialog(productId: any) {
    this.productId = productId;
    this.productImageDialog = true;
  }

  public productImageLoad(event: LazyLoadEvent) {
    this.productImageSetLoadingStatus(true);
    this.productImageEvent = event;
    setTimeout(() => {
      this.productImageLoadData();
    }, 1000);
  }

  private productImageSetLoadingStatus(status: boolean) {
    this.productImageLoading = status;
  }

  private productImageLoadData() {
    this.productService.productImageList(this.productImageEvent, this.productId).subscribe((response) => {
      this.productImageDatas = response.data;
      this.productImageTotalResult = response.total_result;
      this.productImageTotal = response.total;
      this.productImageSetLoadingStatus(false);
    });
  }

  /**
   * 
   * @param id - image id
   */
  public productImagedelete(id: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá?',
      header: 'Xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.productImageDelete(id).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.productImageSetLoadingStatus(true);
            this.productImageLoadData();
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      },
      reject: () => {

      },
      key: "topDialog"
    });
  }

  public productImageOnUpload(event: any) {
    if (event.originalEvent.body.success == 1) {
      this.toastService.success('Thành công', event.originalEvent.body.message);
      this.productImageSetLoadingStatus(true);
      this.productImageLoadData();
    } else {
      this.toastService.error('Lỗi', event.originalEvent.body.message);
    }
  }

  // Product Option
  public showProductOptionDialog(productId: any) {
    this.productId = productId;
    this.productOptionDialog = true;
  }

  public productOptionLoad(event: LazyLoadEvent) {
    this.productOptionSetLoadingStatus(true);
    this.productOptionEvent = event;
    setTimeout(() => {
      this.productOptionLoadData();
    }, 1000);
  }

  private productOptionSetLoadingStatus(status: boolean) {
    this.productOptionLoading = status;
  }

  private productOptionLoadData() {
    this.productService.productOptionList(this.productOptionEvent, this.productId).subscribe((response) => {
      this.productOptionDatas = response.data;
      this.productOptionTotalResult = response.total_result;
      this.productOptionTotal = response.total;
      this.productOptionSetLoadingStatus(false);
    });
  }

  /**
   * 
   * @param id - option id
   */
  public productOptiondelete(id: any) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá?',
      header: 'Xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productService.productOptionDelete(id).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.productOptionSetLoadingStatus(true);
            this.productOptionLoadData();
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      },
      reject: () => {

      },
      key: "topDialog"
    });
  }

  public productOptionSave(files: FileList | null) {
    this.productOptionSubmitted = true;
    if (this.productOptionForm.status == 'VALID') {
      var formData = new FormData();
      var data = this.productOptionForm.value as any;
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

      if (this.productOptionId != 0) {
        // Set PUT method
        formData.append('_method', 'PUT');
        formData.append('id', String(this.productOptionId));
        this.productService.productOptionEdit(formData).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.productOptionSubmitted = false;
            this.productOptionForm.reset();
            this.productOptionSetLoadingStatus(true);
            this.productOptionLoadData();
            this.productOptionId = 0;
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      } else {
        this.productService.productOptionAdd(formData, this.productId).subscribe((response) => {
          if (response.success == 1) {
            this.toastService.success('Thành công', response.message);
            this.productOptionSubmitted = false;
            this.productOptionForm.reset();
            this.productOptionSetLoadingStatus(true);
            this.productOptionLoadData();
          } else {
            this.toastService.error('Lỗi', response.message);
          }
        });
      }
    } else {
      // Do something
    }
  }

  /**
   * 
   * @param id - product option id
   */
  public productOptionEdit(id: any) {
    this.productOptionId = id;
    this.productService.productOptionGet(this.productOptionId).subscribe((response) => {
      if (response.success == 1) {
        this.productOptionSetForm(response.data);
      } else {
        this.toastService.error('Lỗi', response.message);
      }
    });
  }

  private productOptionSetForm(data: any) {
    this.productOptionForm = this.fb.group({
      name: [data.name, [Validators.required]],
      price: [data.price, [Validators.required]],
      stock: [data.stock, [Validators.required]],
    });
  }
}
