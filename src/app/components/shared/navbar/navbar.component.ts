import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() showOrganisationLinks: boolean = false;


  showDropdown = false;
  showChangePasswordForm = false;
  showUpdateEmailForm = false;
  loggedInHR = 'HR Manager'; // Replace with actual user data

  constructor(private router: Router) {}

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
