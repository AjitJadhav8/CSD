import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import Swal from 'sweetalert2';

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

         // Success Notification
         Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${response.user.first_name}!`,
          showConfirmButton: false,
          timer: 2000,
        });


        this.router.navigate(['/app-center']);

      },
      error: (error) => {
        console.error('Login failed', error);
         // Error Notification
         Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again!',
        });
      }
    });
  }

  isSending = false; // Track loading state

  forgotPassword(): void {
    if (!this.email) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please enter your email first!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
  
    this.isSending = true; // Start loading animation
  
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.isSending = false; // Stop animation
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Link Sent!',
          text: 'Please check your email for further instructions.',
        });
      },
      error: (error) => {
        this.isSending = false; // Stop animation
        console.error('Failed to send reset email', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send Email',
          text: 'An error occurred while sending the reset email. Please try again later.',
        });
      }
    });
  }
  
  
  



}
