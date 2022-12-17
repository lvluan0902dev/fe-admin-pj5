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
export class OrderService {
  private url = 'admin/order/';

  constructor(
    private httpService: HttpService
  ) { }

  public list(orderStatus: any, data: any) {
    if (data.sortField == undefined || data.sortField == '') {
      data.sortOrder = 0;
    }

    let payload = {
      first_row: data.first,
      per_page: data.rows == undefined ? 0 : data.rows,
      sort_field: data.sortField == undefined ? '' : data.sortField,
      sort_type: data.sortOrder == 1 ? 'ASC' : 'DESC',
      search: data.searchInput
    };
    return this.httpService.post(this.url + 'list/' + orderStatus, payload, httpOptions);
  }

  /**
   * 
   * @param id - order id
   * @param orderStatus - order status
   */
  public changeOrderStatus(id: any, orderStatus:any) {
    return this.httpService.post(this.url + 'change-order-status/' + id + '/' + orderStatus, httpOptions);
  }

  public orderDetailsList(data: any, id: any) {
    if (data.sortField == undefined || data.sortField == '') {
      data.sortOrder = 0;
    }

    let payload = {
      first_row: data.first,
      per_page: data.rows == undefined ? 0 : data.rows,
      sort_field: data.sortField == undefined ? '' : data.sortField,
      sort_type: data.sortOrder == 1 ? 'ASC' : 'DESC',
      search: data.searchInput
    };
    return this.httpService.post(this.url + 'order-details-list/' + id, payload, httpOptions);
  }

  /**
   * 
   * @param id - order id
   */
  public getOrderTotalPrice(id: any) {
    return this.httpService.get(this.url + 'get-order-total-price/' + id, httpOptions);
  }

  /**
   * 
   * @param id - order id
   * @returns 
   */
  public getOrderDetails(id: any) {
    return this.httpService.get(this.url + 'get-order-details/' + id, httpOptions);
  }

}
