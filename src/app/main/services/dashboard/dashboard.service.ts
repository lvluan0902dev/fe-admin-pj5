import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

const httpOptions = {
  headers: new HttpHeaders({
  })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = 'admin/dashboard/';

  constructor(
    private httpService: HttpService
  ) { }

  public getProductCount() {
    return this.httpService.get(this.url + 'get-product-count', httpOptions);
  }

  public getBlogCount() {
    return this.httpService.get(this.url + 'get-blog-count', httpOptions);
  }

  public getOrderCount() {
    return this.httpService.get(this.url + 'get-order-count', httpOptions);
  }

  public getMessageCount() {
    return this.httpService.get(this.url + 'get-message-count', httpOptions);
  }

  /**
   * 
   * @param id - order id
   * @returns 
   */
  public getOrderStatusCount(id: any) {
    return this.httpService.get(this.url + 'get-order-status-count/' + id, httpOptions);
  }

  public getOrdersLatest() {
    return this.httpService.get(this.url + 'get-orders-latest', httpOptions);
  }

  public getProductsLatest() {
    return this.httpService.get(this.url + 'get-products-latest', httpOptions);
  }

  public getProductsMostViewed() {
    return this.httpService.get(this.url + 'get-products-most-viewed', httpOptions);
  }
}
