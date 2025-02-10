import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-app-center',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './app-center.component.html',
  styleUrl: './app-center.component.css'
})
export class AppCenterComponent {

}
