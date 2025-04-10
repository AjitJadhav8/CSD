import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CSD';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkTokenExpiration();
  }

  private checkTokenExpiration() {
    // 👇 Check if running in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const jwtToken = JSON.parse(atob(token.split('.')[1]));
          const isExpired = Date.now() >= jwtToken.exp * 1000;
          
          if (isExpired) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        } catch (e) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    }
  }
}
