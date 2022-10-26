import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public set(token: string) {
    localStorage.setItem('token', token);
  }

  public get() {
    return localStorage.getItem('token');
  }

  public remove() {
    localStorage.removeItem('token');
  }

  private isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload.iss === environment.apiUrl + '/login') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  private payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  private decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  public loggedIn() {
    return this.isValid();
  }
}
