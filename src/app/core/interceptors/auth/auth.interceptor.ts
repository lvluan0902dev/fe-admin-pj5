import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static router: Router;

  constructor(
    private tokenService: TokenService,
    router: Router
  ) {
    AuthInterceptor.router = router;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.get();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const authRequest = request.clone({ headers });
      return next.handle(authRequest).pipe(catchError(this.handleError));
    } else {
      localStorage.removeItem('token');
      AuthInterceptor.router.navigateByUrl('/login');
    }
    return next.handle(request);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      localStorage.removeItem('token');
      AuthInterceptor.router.navigateByUrl('/login');
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
