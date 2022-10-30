import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { TokenService } from '../token/token.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
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
    private httpService: HttpService,
  ) { }

  public changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  public login(data: object) {
    return this.httpService.post('login', data, httpOptions);
  }

  public register(data: object) {
    return this.httpService.post('register', data, httpOptions);
  }

  public me() {
    return this.httpService.post('me', null, httpOptions);
  }

  public logout() {
    return this.httpService.post('logout', null, httpOptions);
  }
}
