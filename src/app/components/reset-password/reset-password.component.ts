import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {


  token = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'New Password and Confirm Password do not match. Please try again!',
      });
      return;
    }
  
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful!',
          text: 'You can now log in with your new password.',
          confirmButtonText: 'Go to Login'
        }).then(() => {
          this.router.navigate(['/login']); // Redirect after user clicks the button
        });
      },
      error: (error) => {
        console.error('Password reset failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Password Reset Failed',
          text: 'Something went wrong. Please try again later.',
        });
      }
    });
  }



}
