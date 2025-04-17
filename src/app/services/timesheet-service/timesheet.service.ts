import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../secureStorage-service/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private secureStorage: SecureStorageService) {
    // Constructor logic if needed
  }


  // Method to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = this.secureStorage.getItem('token'); // Retrieve token from storage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }



    // New method to fetch assigned customers and projects
    getAssignedCustomersAndProjects(employeeId: number): Observable<any> {
      const headers = this.getAuthHeaders(); // Get headers with token
      return this.http.get(`${this.apiUrl}/api/timesheet/assigned-customers-projects/${employeeId}`, { headers });
    }



  submitTimesheet(timesheetData: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post(`${this.apiUrl}/api/timesheet/submit`, timesheetData, { headers });
  }

  // Fetch all timesheets
  getUserTimesheets(userId: number, date?: string): Observable<any> {
    const headers = this.getAuthHeaders();
    let params = new HttpParams();
    
    if (date) {
        params = params.set('date', date);
    }
    
    return this.http.get(`${this.apiUrl}/api/timesheet/timesheets/${userId}`, { headers, params });
}

  // Delete timesheet
  deleteTimesheet(timesheetId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/api/timesheet/timesheet/${timesheetId}`, { headers });
  }

  // --------------------------------------------------Expoert-------------------

  // Fetch full timesheet data
  getUserFullTimesheet(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/api/timesheet/full-timesheet/${userId}`, { headers });
  }

    // ----------------------- Managers Hub ---------------------------
  getProjectTeamByManager(projectManagerId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.apiUrl}/api/timesheet/team-by-manager/${projectManagerId}`, { headers });
}

// Add to your timesheet service
getProjectTeamsTimesheet(projectManagerId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.apiUrl}/api/timesheet/team-timesheets/${projectManagerId}`, { headers });
}

getReportingTeamByManager(reportingManagerId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.apiUrl}/api/timesheet/team-by-reporting-manager/${reportingManagerId}`, { headers });
}

// Add to your timesheet service
getReportingTeamsTimesheet(reportingManagerId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.get(`${this.apiUrl}/api/timesheet/reporting-team-timesheets/${reportingManagerId}`, { headers });
}

updateTimesheet(timesheetId: number, timesheetData: any): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.put(`${this.apiUrl}/api/timesheet/timesheets/${timesheetId}`, timesheetData, { headers });
}


}
