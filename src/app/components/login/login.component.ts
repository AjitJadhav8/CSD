import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  login() {
    // Hardcoded credentials
    const hardcodedUsername = '123';
    const hardcodedPassword = '123';

    if (this.username === hardcodedUsername && this.password === hardcodedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']); // Redirect to dashboard or home
    } else {
      this.errorMessage = 'Invalid credentials!';
    }
  }



}
