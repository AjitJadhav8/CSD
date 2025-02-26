import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
@Component({
  selector: 'app-timesheet-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './timesheet-dashboard.component.html',
  styleUrl: './timesheet-dashboard.component.css'
})
export class TimesheetDashboardComponent {

}
