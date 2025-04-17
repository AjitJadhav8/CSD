import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../../../../services/developer-service/developer.service';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private developerService: DeveloperService,
    private secureStorage: SecureStorageService
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(): void {
    this.isLoading = true;
    this.developerService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.errorMessage = 'Failed to load user data';
        this.isLoading = false;
      }
    );
  }
}