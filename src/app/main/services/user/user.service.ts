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
export class UserService {
  private url = 'admin/account/';

  constructor(
    private httpService: HttpService
  ) { }

  public changeInformation(data: any) {
    let payload = data;
    return this.httpService.post(this.url + 'change-information', payload, httpOptions);
  }
}
