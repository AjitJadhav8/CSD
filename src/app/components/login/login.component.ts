import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private authService:AuthService, private router:Router ) {}

  onSubmit(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user_id', response.user.user_id);
      localStorage.setItem('first_name', response.user.first_name);
      localStorage.setItem('last_name', response.user.last_name);
      localStorage.setItem('role_id', response.user.role_id);
      localStorage.setItem('email', response.user.email);
      // console.log('Login successful', response);

        this.router.navigate(['/app-center']);

      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }



}
