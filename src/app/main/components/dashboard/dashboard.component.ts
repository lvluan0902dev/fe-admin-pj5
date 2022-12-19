import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Order } from '../../models/order/order.model';
import { Product } from '../../models/product/product.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public url = environment.url + '/';
  public totalProduct: number = 0;
  public totalBlog: number = 0;
  public totalOrder: number = 0;
  public totalMessage: number = 0;
  public totalOrderNew: number = 0;
  public totalOrderTransport: number = 0;
  public totalOrderDone: number = 0;
  public totalOrderCancel: number = 0;
  public ordersLatest: Order[] = [];
  public productsLatest: Product[] = [];
  public productsMostViewed: Product[] = [];

  constructor(
    private authService: AuthService,
    private title: Title,
    private dashboardService: DashboardService
  ) {
    this.title.setTitle('Bảng điều khiển');
  }

  ngOnInit(): void {
    this.me();
    this.getProductCount();
    this.getBlogCount();
    this.getOrderCount();
    this.getMessageCount();
    this.getOrderStatusCount();
    this.getOrdersLatest();
    this.getProductsLatest();
    this.getProductsMostViewed();
  }

  private me() {
    this.authService.me().subscribe((data) => {
      console.log(data);
    })
  }

  private getProductCount() {
    this.dashboardService.getProductCount().subscribe((response) => {
      if (response.success == 1) {
        this.totalProduct = response.data;
      }
    });
  }

  private getBlogCount() {
    this.dashboardService.getBlogCount().subscribe((response) => {
      if (response.success == 1) {
        this.totalBlog = response.data;
      }
    });
  }

  private getOrderCount() {
    this.dashboardService.getOrderCount().subscribe((response) => {
      if (response.success == 1) {
        this.totalOrder = response.data;
      }
    });
  }

  private getMessageCount() {
    this.dashboardService.getMessageCount().subscribe((response) => {
      if (response.success == 1) {
        this.totalMessage = response.data;
      }
    });
  }

  private getOrderStatusCount() {
    this.dashboardService.getOrderStatusCount(0).subscribe((response) => {
      if (response.success == 1) {
        this.totalOrderNew = response.data;
      }
    });

    this.dashboardService.getOrderStatusCount(1).subscribe((response) => {
      if (response.success == 1) {
        this.totalOrderTransport = response.data;
      }
    });

    this.dashboardService.getOrderStatusCount(2).subscribe((response) => {
      if (response.success == 1) {
        this.totalOrderDone = response.data;
      }
    });

    this.dashboardService.getOrderStatusCount(3).subscribe((response) => {
      if (response.success == 1) {
        this.totalOrderCancel = response.data;
      }
    });
  }

  private getOrdersLatest() {
    this.dashboardService.getOrdersLatest().subscribe((response) => {
      if (response.success == 1) {
        this.ordersLatest = response.data;
      }
    });
  }

  private getProductsLatest() {
    this.dashboardService.getProductsLatest().subscribe((response) => {
      if (response.success == 1) {
        this.productsLatest = response.data;
      }
    });
  }

  private getProductsMostViewed() {
    this.dashboardService.getProductsMostViewed().subscribe((response) => {
      if (response.success == 1) {
        this.productsMostViewed = response.data;
      }
    });
  }
}
