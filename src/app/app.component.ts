import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'consult-me';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.pipe().subscribe((user) => {
      if (user) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  ngOnInit() {
    // this.authService.getToken().subscribe((tokenObj) => {
    //   this.authService.storeTokenInLocalStorage(tokenObj['access_token']);
    // })
  }

  logout() {
    this.authService.logout();
  }

  diagnoseMe() {
    this.router.navigate(['/diagnosis-helper']);
  }
  
}
