import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  public authStatus = this.loggedIn.asObservable();

  constructor(private tokenService: TokenService) { }

  public changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }
}
