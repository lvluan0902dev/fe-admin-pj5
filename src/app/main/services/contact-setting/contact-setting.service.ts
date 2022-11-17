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
export class ContactSettingService {
  private url = 'admin/contact-setting/';

  constructor(
    private httpService: HttpService
  ) { }

  public get(title: any) {
    return this.httpService.get(this.url + 'get/' + title, httpOptions);
  }

  public edit(data: any) {
    let payload = data;
    return this.httpService.post(this.url + 'edit', payload, httpOptions);
  }
}
