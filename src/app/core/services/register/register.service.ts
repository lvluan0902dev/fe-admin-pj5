import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../../handlers/error/error.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  public register(data: object) {
    let url = this.apiUrl + '/auth/register';
    return this.http.post(url, data, httpOptions).pipe(catchError(this.errorService.handleError));
  }
}
