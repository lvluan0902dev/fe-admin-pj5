import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { HttpService } from '../http/http.service';
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

  constructor(
    private tokenService: TokenService,
    private http: HttpService,
    ) { }

  public changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  public login(data: object) {
    return this.http.post('login', data, httpOptions);
  }

  public register(data: object) {
    return this.http.post('register', data, httpOptions);
  }

  public me() {
    return this.http.post('me', null, httpOptions);
  }

  public logout() {
    this.tokenService.remove();
  }
}
