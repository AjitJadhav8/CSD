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

  userRole: number | null = null;
  ngOnInit(): void {
    this.userRole = this.secureStorage.getItem('role_id'); // Get the user's role_id
    
  }
}
