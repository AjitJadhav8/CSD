import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() showOrganisationLinks: boolean = false;
  @Input() showTimesheetLinks: boolean = false;
  @Input() showResourceManagementLinks: boolean = false; // New Input

  navigateToCustomerSection(section: string) {
    localStorage.setItem('selectedCustomerSection', section);
    this.router.navigate(['/organisation/customer']).then(() => {
      // Force refresh customer component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }

  showDropdown = false;
  showChangePasswordForm = false;
  showUpdateEmailForm = false;
  loggedInUserName = ''; // Replace with actual user data

  setLoggedInUser() {
    const firstName = localStorage.getItem('first_name') || '';
    const lastName = localStorage.getItem('last_name') || '';
    this.loggedInUserName = firstName && lastName ? `${firstName} ${lastName}` : 'User';
  }

  constructor(private router: Router) {
    this.setLoggedInUser();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    // Clear all stored data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('role_id');
    localStorage.removeItem('email');

    // Optionally, keep the remembered email if the user chose "Remember Me"
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    localStorage.clear(); // Clears all data
    if (rememberedEmail) {
      localStorage.setItem('rememberedEmail', rememberedEmail); // Restore remembered email
    }

    // Redirect to login page and show logout confirmation
    this.router.navigate(['/login']).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-end',
        toast: true
      });
    });
  }

}
