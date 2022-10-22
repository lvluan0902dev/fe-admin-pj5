import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../handlers/error.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  login(data: object) {
    let url = this.apiUrl + '/auth/login';
    return this.http.post(url, data, httpOptions).pipe(catchError(this.errorService.handleError));
  }
}
