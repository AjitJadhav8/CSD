  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { CommonModule } from '@angular/common';
  import { AuthService } from '../../services/auth-service/auth.service';
  import Swal from 'sweetalert2';
import { SecureStorageService } from '../../services/secureStorage-service/secure-storage.service';

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
    rememberMe = false; // Track Remember Me state
    isSending = false; // Track loading state


    constructor(private authService:AuthService, private router:Router,     private secureStorage: SecureStorageService    ) {
      this.loadRememberedEmail(); // Load remembered email on component initialization
 // Clear old encrypted data on startup
 if (typeof window !== 'undefined') {
  localStorage.removeItem('rememberedEmail');
}
this.loadRememberedEmail();
    }

    // Load email from localStorage if "Remember Me" was previously checked
    loadRememberedEmail(): void {
      if (typeof window !== 'undefined') {
        const rememberedEmail = this.secureStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
          this.email = rememberedEmail;
          this.rememberMe = true;
        }
      }
    }
    
  onSubmit(): void {
    if (typeof window !== 'undefined') {
      if (this.rememberMe) {
        this.secureStorage.setItem('rememberedEmail', this.email);
      } else {
        this.secureStorage.removeItem('rememberedEmail');
      }
    }
  
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (typeof window !== 'undefined') {
           this.secureStorage.setItem('token', response.token);
           this.secureStorage.setItem('user_id', response.user.user_id);
           this.secureStorage.setItem('first_name', response.user.first_name);
           this.secureStorage.setItem('last_name', response.user.last_name);
           this.secureStorage.setItem('role_id', response.user.role_id);
           this.secureStorage.setItem('email', response.user.email);
           this.secureStorage.setItem('is_RM', response.user.is_RM);
           this.secureStorage.setItem('is_PM', response.user.is_PM);
        }

        Swal.fire({
          toast: true,
          position: 'top-end',
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
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again!',
        });
      }
    });
  }

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
