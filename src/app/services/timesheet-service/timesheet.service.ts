import { HttpClient } from '@angular/common/http';
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

  submitTimesheet(timesheetData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/timesheet/submit`, timesheetData);
  }

  // Fetch all timesheets
  getUserTimesheets(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/timesheet/timesheets/${userId}`);
  }
  
  
}
