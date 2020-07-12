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
    console.log(this.authService.user$);
    this.authService.user$.pipe().subscribe((user) => {
      console.log(user == null);
      if (user) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/login']);
      }
    })
  }

  logout() {
    this.authService.logout();
  }
  
}
