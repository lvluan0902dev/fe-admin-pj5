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
export class ContactManageService {
  private url = 'admin/contact-manage/';

  constructor(
    private httpService: HttpService
  ) { }

  public listMessage(data: any) {
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
    return this.httpService.post(this.url + 'list-message', payload, httpOptions);
  }

  public deleteMessage(id: any) {
    return this.httpService.delete(this.url + 'delete-message/' + id, httpOptions);
  }

  public listNotificationEmail(data: any) {
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
    return this.httpService.post(this.url + 'list-notification-email', payload, httpOptions);
  }

  public deleteNotificationEmail(id: any) {
    return this.httpService.delete(this.url + 'delete-notification-email/' + id, httpOptions);
  }
}
