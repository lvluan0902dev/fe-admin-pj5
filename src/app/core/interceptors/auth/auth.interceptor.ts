import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static router: Router;

  constructor(
    private tokenService: TokenService,
    private errorService: ErrorService,
    router: Router
  ) {
    AuthInterceptor.router = router;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.get();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      request = request.clone({ headers });
    } else {
      localStorage.removeItem('token');
      AuthInterceptor.router.navigateByUrl('/login');
    }
    return next.handle(request).pipe(catchError(this.errorService.handleError));
  }
}
