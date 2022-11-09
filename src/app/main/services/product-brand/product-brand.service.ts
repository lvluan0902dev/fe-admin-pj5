import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductBrandService {
  private url = 'product-brand/';

  constructor(
    private httpService: HttpService
  ) { }

  public list(data: any) {
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
    return this.httpService.post(this.url + 'list', payload, httpOptions);
  }

  public add(data: any) {
    let payload = data;
    return this.httpService.post(this.url + 'add', payload, httpOptions);
  }

  public get(id: any) {
    return this.httpService.get(this.url + 'get/' + id, httpOptions);
  }

  public edit(data: any) {
    let payload = data;
    return this.httpService.post(this.url + 'edit', payload, httpOptions);
  }

  public delete(id: any) {
    return this.httpService.delete(this.url + 'delete/' + id, httpOptions);
  }
}
