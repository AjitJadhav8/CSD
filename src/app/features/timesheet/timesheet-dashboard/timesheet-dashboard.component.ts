import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
import { AuthService } from '../../../services/auth-service/auth.service';
@Component({
  selector: 'app-timesheet-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './timesheet-dashboard.component.html',
  styleUrl: './timesheet-dashboard.component.css'
})
export class TimesheetDashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.router.url === '/timesheet' || this.router.url === '/timesheet/') {
      const isPM = this.authService.isPM(); // Use the public method
      this.router.navigate([isPM ? '/timesheet/pm-timesheet' : '/timesheet/fill-timesheet']);
    }
  }
}
