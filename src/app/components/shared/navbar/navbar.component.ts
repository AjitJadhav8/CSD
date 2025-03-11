import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isActive(route: string): boolean {
    return this.router.url === route;
  }

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
  isCustomerSectionActive(section: string): boolean {
    return localStorage.getItem('selectedCustomerSection') === section;
  }
  navigateToProjectSection(section: string) {
    localStorage.setItem('selectedProjectSection', section);
    this.router.navigate(['/organisation/project']).then(() => {
      // Force refresh project component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }
  isProjectSectionActive(section: string): boolean {
    return localStorage.getItem('selectedProjectSection') === section;
  }
  navigateToEmployeeSection(section: string) {
    localStorage.setItem('selectedEmployeeSection', section);

    this.router.navigate(['/organisation/employee']).then(() => {
      // Force refresh employee component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }
  isEmployeeSectionActive(section: string): boolean {
    return localStorage.getItem('selectedEmployeeSection') === section;
  }

  showDropdown = false;
  showChangePasswordForm = false;
  showUpdateEmailForm = false;
  loggedInUserName = ''; // Replace with actual user data
  showCustomerDropdown = false;
  showProjectDropdown = false;
  showEmployeeDropdown = false;

  @ViewChild('customerDropdown') customerDropdown!: ElementRef;
  @ViewChild('projectDropdown') projectDropdown!: ElementRef;
  @ViewChild('employeeDropdown') employeeDropdown!: ElementRef;
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Close Customer Dropdown if clicked outside
    if (this.customerDropdown && !this.customerDropdown.nativeElement.contains(event.target)) {
      this.showCustomerDropdown = false;
    }

    // Close Project Dropdown if clicked outside
    if (this.projectDropdown && !this.projectDropdown.nativeElement.contains(event.target)) {
      this.showProjectDropdown = false;
    }

    // Close Employee Dropdown if clicked outside
    if (this.employeeDropdown && !this.employeeDropdown.nativeElement.contains(event.target)) {
      this.showEmployeeDropdown = false;
    }
  }

  toggleCustomerDropdown() {
    this.showCustomerDropdown = !this.showCustomerDropdown;
    this.showProjectDropdown = false; // Close other dropdowns
    this.showEmployeeDropdown = false;
  }

  toggleProjectDropdown() {
    this.showProjectDropdown = !this.showProjectDropdown;
    this.showCustomerDropdown = false; // Close other dropdowns
    this.showEmployeeDropdown = false;
  }

  toggleEmployeeDropdown() {
    this.showEmployeeDropdown = !this.showEmployeeDropdown;
    this.showCustomerDropdown = false; // Close other dropdowns
    this.showProjectDropdown = false;
  }

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
    localStorage.removeItem('selectedCustomerSection');

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
