import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-report-section-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './report-section-dashboard.component.html',
  styleUrl: './report-section-dashboard.component.css'
})
export class ReportSectionDashboardComponent {

}
