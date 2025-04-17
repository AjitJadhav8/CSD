import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-developer-section-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './developer-section-dashboard.component.html',
  styleUrl: './developer-section-dashboard.component.css'
})
export class DeveloperSectionDashboardComponent {
  showPasswordModal = false;
  passwordInput = '';
  readonly correctPassword = '0604';

  constructor(private router: Router) {}

  navigateToUserManagement() {
    this.showPasswordModal = true;
  }

  verifyPassword() {
    if (this.passwordInput === this.correctPassword) {
      // Use the full path including the parent route
      this.router.navigate(['developer-section', 'user-management']);
      this.showPasswordModal = false;
      this.passwordInput = '';
    } else {
      alert('Incorrect password!');
      this.passwordInput = '';
    }
  }
  closeModal() {
    this.showPasswordModal = false;
    this.passwordInput = '';
  }
}
