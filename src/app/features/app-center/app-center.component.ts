import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-center',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent,CommonModule],
  templateUrl: './app-center.component.html',
  styleUrl: './app-center.component.css'
})
export class AppCenterComponent {
  userRole: string | null = null;
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role_id'); // Get the user's role_id
  }
}
