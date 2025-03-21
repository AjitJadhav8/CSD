import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, { token, newPassword });
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/change-password`, {
      userId,
      currentPassword,
      newPassword
    });
  }
  

}
