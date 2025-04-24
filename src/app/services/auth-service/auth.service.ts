import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecureStorageService } from '../secureStorage-service/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private secureStorage: SecureStorageService) { }



  private getAuthHeaders(): HttpHeaders {
    const token = this.secureStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }






  logout() {
    // Clear all auth-related items from storage
    this.secureStorage.removeItem('token');
    this.secureStorage.removeItem('user_id');
    this.secureStorage.removeItem('first_name');
    this.secureStorage.removeItem('last_name');
    this.secureStorage.removeItem('role_id');
    this.secureStorage.removeItem('email');
    this.secureStorage.removeItem('is_RM');
    this.secureStorage.removeItem('is_PM');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, credentials);
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, { token, newPassword });
  }

  // changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/auth/change-password`, {
  //     userId,
  //     currentPassword,
  //     newPassword
  //   });
  // }
  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/auth/change-password`, 
      { userId, currentPassword, newPassword },
      { headers: this.getAuthHeaders() }  // Add auth headers for authenticated request
    );
  }
  // refreshToken(): Observable<any> {
  //   return this.http.post(
  //     `${this.apiUrl}/api/auth/refresh`, 
  //     {},  // Empty body since refresh token should be in cookies
  //     { headers: this.getAuthHeaders() }  // Current token in headers
  //   );
  // }

}
