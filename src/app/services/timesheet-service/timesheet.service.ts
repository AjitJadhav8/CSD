import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }


  // Method to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  submitTimesheet(timesheetData: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post(`${this.apiUrl}/api/timesheet/submit`, timesheetData, { headers });
  }

  // Fetch all timesheets
  getUserTimesheets(userId: number): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.get(`${this.apiUrl}/api/timesheet/timesheets/${userId}`, { headers });

  }

  // Delete timesheet
  deleteTimesheet(timesheetId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/api/timesheet/timesheet/${timesheetId}`, { headers });
  }
  
  
}
