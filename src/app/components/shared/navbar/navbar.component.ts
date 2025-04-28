import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth-service/auth.service';
import { FormsModule } from '@angular/forms';
import { SecureStorageService } from '../../../services/secureStorage-service/secure-storage.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // Method to check if the current route is '/app-center'
  isAppCenterRoute(): boolean {
    return this.router.url === '/app-center';
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

  @Input() showOrganisationLinks: boolean = false;
  @Input() showTimesheetLinks: boolean = false;
  @Input() showResourceManagementLinks: boolean = false; // New Input
  @Input() showReportSectionLinks: boolean = false;

  // Add navigation methods for report section
  navigateToReportSection(section: string) {
    this.secureStorage.setItem('selectedReportSection', section);
    this.router.navigate(['/report-section', section]).then(() => {
      window.dispatchEvent(new Event('storage'));
    });
  }

  isReportSectionActive(section: string): boolean {
    return this.secureStorage.getItem('selectedReportSection') === section;
  }

  navigateToCustomerSection(section: string) {
    this.secureStorage.setItem('selectedCustomerSection', section);
    this.router.navigate(['/organisation/customer']).then(() => {
      // Force refresh customer component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }
  isCustomerSectionActive(section: string): boolean {
    return this.secureStorage.getItem('selectedCustomerSection') === section;
  }


  navigateToProjectSection(section: string) {
    this.secureStorage.setItem('selectedProjectSection', section);
    this.router.navigate(['/organisation/project']).then(() => {
      // Force refresh project component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }
  isProjectSectionActive(section: string): boolean {
    return this.secureStorage.getItem('selectedProjectSection') === section;
  }
  navigateToEmployeeSection(section: string) {
    this.secureStorage.setItem('selectedEmployeeSection', section);

    this.router.navigate(['/organisation/employee']).then(() => {
      // Force refresh employee component to detect changes
      window.dispatchEvent(new Event('storage'));
    });
  }
  isEmployeeSectionActive(section: string): boolean {
    return this.secureStorage.getItem('selectedEmployeeSection') === section;
  }
  navigateToManagersHubSection(section: string) {
    this.secureStorage.setItem('selectedManagersHubSection', section);
    this.router.navigate(['/timesheet/managers-hub']).then(() => {
      window.dispatchEvent(new Event('storage'));
    });
  }


  isManagersHubSectionActive(section: string): boolean {
    return this.secureStorage.getItem('selectedManagersHubSection') === section;
  }

  showDropdown = false;
  showChangePasswordForm = false;
  showUpdateEmailForm = false;
  loggedInUserName = ''; // Replace with actual user data
  showCustomerDropdown = false;
  showProjectDropdown = false;
  showEmployeeDropdown = false;
  showManagersHubDropdown = false;
  showReportDropdown = false; // Add this for report section dropdown

  isRM = false;
  isPM = false; 

  @ViewChild('customerDropdown') customerDropdown!: ElementRef;
  @ViewChild('projectDropdown') projectDropdown!: ElementRef;
  @ViewChild('employeeDropdown') employeeDropdown!: ElementRef;
  @ViewChild('managersHubDropdown') managersHubDropdown!: ElementRef;
  @ViewChild('userDropdown') userDropdown!: ElementRef;
  @ViewChild('reportDropdown') reportDropdown!: ElementRef; // Add this for report section


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

    // Close Managers Hub Dropdown if clicked outside
    if (this.managersHubDropdown && !this.managersHubDropdown.nativeElement.contains(event.target)) {
      this.showManagersHubDropdown = false;
    }

        // Add this for report section dropdown
        if (this.reportDropdown && !this.reportDropdown.nativeElement.contains(event.target)) {
          this.showReportDropdown = false;
        }




    if (this.userDropdown && !this.userDropdown.nativeElement.contains(event.target)) {
      this.showDropdown = false;
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
  toggleManagersHubDropdown() {
    this.showManagersHubDropdown = !this.showManagersHubDropdown;
    this.showCustomerDropdown = false;
    this.showProjectDropdown = false;
    this.showEmployeeDropdown = false;
  }

  toggleReportDropdown() {
    this.showReportDropdown = !this.showReportDropdown;
    // Close other dropdowns
    this.showCustomerDropdown = false;
    this.showProjectDropdown = false;
    this.showEmployeeDropdown = false;
    this.showManagersHubDropdown = false;
  }



  setLoggedInUser() {
    const firstName = this.secureStorage.getItem('first_name') || '';
    const lastName = this.secureStorage.getItem('last_name') || '';
    this.loggedInUserName = firstName && lastName ? `${firstName} ${lastName}` : 'User';
  }

  constructor(private router: Router, private authService: AuthService, private secureStorage: SecureStorageService ) {
    this.setLoggedInUser();
      // Check localStorage for RM/PM status when component initializes
      if (typeof window !== 'undefined') {
        this.isRM = this.secureStorage.getItem('is_RM') ;
        this.isPM = this.secureStorage.getItem('is_PM') ;
      }
      console.log('Reporting ', this.isRM, 'Project ', this.isPM)
  }
  get shouldShowManagersHub(): boolean {
    return this.isRM || this.isPM;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    // Clear all stored data from localStorage
    this.secureStorage.removeItem('token');
    this.secureStorage.removeItem('user_id');
    this.secureStorage.removeItem('first_name');
    this.secureStorage.removeItem('last_name');
    this.secureStorage.removeItem('role_id');
    this.secureStorage.removeItem('email');
    this.secureStorage.removeItem('selectedCustomerSection');
    this.secureStorage.removeItem('selectedProjectSection');
    this.secureStorage.removeItem('selectedEmployeeSection');
    this.secureStorage.removeItem('selectedManagersHubSection');
    


    // Optionally, keep the remembered email if the user chose "Remember Me"
    const rememberedEmail = this.secureStorage.getItem('rememberedEmail');
    this.secureStorage.clear(); // Clears all data
    if (rememberedEmail) {
      this.secureStorage.setItem('rememberedEmail', rememberedEmail); // Restore remembered email
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

  showChangePasswordModal = false;
  changePasswordData = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  // Open change password modal
  openChangePasswordModal() {
    this.showChangePasswordModal = true;
    this.showDropdown = false; // Close dropdown when modal opens
  }

  // Close change password modal
  closeChangePasswordModal() {
    this.showChangePasswordModal = false;
    this.changePasswordData = { currentPassword: '', newPassword: '', confirmNewPassword: '' }; // Reset form
  }
  // Handle change password form submission
  onChangePasswordSubmit(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields correctly!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    if (this.changePasswordData.newPassword !== this.changePasswordData.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'New Password and Confirm New Password do not match!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    const userId = this.secureStorage.getItem('user_id'); // Get logged-in user ID
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not found!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    // Call AuthService to change password
    this.authService.changePassword(userId, this.changePasswordData.currentPassword, this.changePasswordData.newPassword)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password changed successfully!',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false
          });
          this.closeChangePasswordModal();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message || 'Failed to change password!',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
  }

}
