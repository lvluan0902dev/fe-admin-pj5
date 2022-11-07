import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { BeautyImage } from 'src/app/main/models/beauty-image/beauty-image.model';
import { BeautyImageService } from 'src/app/main/services/beauty-image/beauty-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beauty-image-list',
  templateUrl: './beauty-image-list.component.html',
  styleUrls: ['./beauty-image-list.component.css']
})
export class BeautyImageListComponent implements OnInit {
  public url = environment.url + '/';
  public datas: BeautyImage[] = [];
  public totalResult: number = 0;
  public total: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';

  constructor(
    private beautyImageService: BeautyImageService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this.title.setTitle('Danh sách Hình ảnh đẹp');
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
    this.beautyImageService.list(this.event).subscribe((response) => {
      this.datas = response.data;
      this.totalResult = response.total_result;
      this.total = response.total;
      this.setLoadingStatus(false);
    });
  }

  public delete(id: number) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xoá?',
      header: 'Xoá',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.beautyImageService.delete(id).subscribe((response) => {
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
}
