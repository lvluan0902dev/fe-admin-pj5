import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../../handlers/error/error.service';
import { TokenService } from '../token/token.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  public authStatus = this.loggedIn.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    ) { }

  public changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  public login(data: object) {
    let url = this.apiUrl + '/login';
    return this.http.post(url, data, httpOptions);
  }

  public register(data: object) {
    let url = this.apiUrl + '/register';
    return this.http.post(url, data, httpOptions);
  }

  public me() {
    let url = this.apiUrl + '/me';
    return this.http.post(url, null, httpOptions);
  }

  public logout() {
    this.tokenService.remove();
  }
}
