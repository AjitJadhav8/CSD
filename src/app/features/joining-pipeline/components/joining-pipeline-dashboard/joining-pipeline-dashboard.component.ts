import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-joining-pipeline-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './joining-pipeline-dashboard.component.html',
  styleUrl: './joining-pipeline-dashboard.component.css'
})
export class JoiningPipelineDashboardComponent {

}
