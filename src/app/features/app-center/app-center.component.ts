import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { SecureStorageService } from '../../services/secureStorage-service/secure-storage.service';

@Component({
  selector: 'app-app-center',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent,CommonModule],
  templateUrl: './app-center.component.html',
  styleUrl: './app-center.component.css'
})
export class AppCenterComponent {

  constructor(
    private secureStorage: SecureStorageService
  ){}

  showOrgMaster: boolean = false;
  showTimesheet: boolean = true; // Always visible
  showResourceMgmt: boolean = false;
  showDeveloperTools: boolean = false;
  showReports: boolean = false;

  userRole: number | null = null;
  ngOnInit(): void {
    this.userRole = this.secureStorage.getItem('role_id');
    this.updateVisibility();
  }

  private updateVisibility(): void {
    if (this.userRole === null) return;
    
    // Organization Master - visible to all except role 4
    this.showOrgMaster = this.userRole !== 4;
    
    // Resource Management - visible to all except role 4
    this.showResourceMgmt = this.userRole !== 4;
    
    // Developer Tools - only for role 5
    this.showDeveloperTools = this.userRole === 5;
    
    // Reports - only for role 5
    this.showReports = this.userRole === 5;
  }
}
