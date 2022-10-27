import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    if (!this.tokenService.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
}
