import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecureStorageService } from '../secureStorage-service/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private secureStorage: SecureStorageService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.secureStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllTeamTimesheets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reports/team-timesheets`, {
      headers: this.getAuthHeaders()
    });
  }

  getReportOptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reports/options`, {
      headers: this.getAuthHeaders()
    });
  }


// Project team Report

// Add this method to your existing ReportService
getAllProjectTeams(): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/reports/project-teams`, {
    headers: this.getAuthHeaders()
  });

}

// Employee Report
getAllEmployees(): Observable<any>{
  return this.http.get(`${this.apiUrl}/api/reports/employees`, {
    headers: this.getAuthHeaders()
  });
}

//customer Report
// In report.service.ts
getCustomerReport(): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/reports/customers`, {
    headers: this.getAuthHeaders()
  });
}

// project repoert 
// In report.service.ts
getProjectReport(): Observable<any> {
  return this.http.get(`${this.apiUrl}/api/reports/projects`, {
    headers: this.getAuthHeaders()
  });
}





}
