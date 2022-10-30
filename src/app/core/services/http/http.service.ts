import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private host = environment.apiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  public get(api: string, options?: any): Observable<any> {
    const url = `${this.host}/${api}`
    return this.httpClient.get(url, options);
  }

  public post(api: string, payload: any, options?: any): Observable<any> {
    const url = `${this.host}/${api}`
    return this.httpClient.post(url, payload, options)
  }

  public put() {

  }

  public patch() {

  }

  public delete() {

  }
}
