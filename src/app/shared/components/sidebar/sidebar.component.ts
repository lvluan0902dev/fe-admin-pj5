import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public loggedIn?: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(value => this.loggedIn = value);
  }

  public logout(event: MouseEvent) {
    event.preventDefault();
    this.authService.logout().subscribe((data) => {
      console.log(data);
    });
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.toastService.success('Thành công', 'Đăng xuất thành công');
  }
}
