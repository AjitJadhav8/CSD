import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-resource-management-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavbarComponent],
  templateUrl: './resource-management-dashboard.component.html',
  styleUrl: './resource-management-dashboard.component.css'
})
export class ResourceManagementDashboardComponent {

}
