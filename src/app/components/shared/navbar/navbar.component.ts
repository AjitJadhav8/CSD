import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() showOrganisationLinks: boolean = false;
  @Input() showTimesheetLinks: boolean = false;


  showDropdown = false;
  showChangePasswordForm = false;
  showUpdateEmailForm = false;
  loggedInUser = 'HR Manager'; // Replace with actual user data

  constructor(private router: Router) {}

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
