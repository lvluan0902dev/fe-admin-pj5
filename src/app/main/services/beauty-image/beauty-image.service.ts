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
export class BeautyImageService {

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
    return this.httpService.post('beauty-image/list', payload, httpOptions);
  }

  public add(data: any) {
    let payload = data;
    return this.httpService.post('beauty-image/add', payload, httpOptions);
  }

  public get(id: any) {
    return this.httpService.get('beauty-image/get/' + id, httpOptions);
  }

  public edit(data: any) {
    let payload = data;
    return this.httpService.post('beauty-image/edit', payload, httpOptions);
  }

  public delete(id: any) {
    return this.httpService.delete('beauty-image/delete/' + id, httpOptions);
  }
}
