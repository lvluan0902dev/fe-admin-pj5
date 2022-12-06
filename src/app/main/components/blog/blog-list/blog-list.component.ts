import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Blog } from 'src/app/main/models/blog/blog.model';
import { BlogService } from 'src/app/main/services/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public url = environment.url + '/';
  public datas: Blog[] = [];
  public totalResult: number = 0;
  public total: number = 0;
  public loading: boolean = true;
  public event: any;
  public search_input: string = '';

  constructor(
    private blogService: BlogService,
    private title: Title,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this.title.setTitle('Danh sách Bài viết');
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
    this.blogService.list(this.event).subscribe((response) => {
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
        this.blogService.delete(id).subscribe((response) => {
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
