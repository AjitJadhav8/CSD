import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../secureStorage-service/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RmgService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,  private secureStorage: SecureStorageService) {
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.secureStorage.getItem('token'); // Retrieve token from storage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  // delete project team assignment
  deleteProjectTeam(id: number): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.delete(`${this.apiUrl}/api/rmg/assignments/${id}`, { headers });
  }

  submitAssignProjectTeam(assignmentData: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post(`${this.apiUrl}/api/rmg/assign`, assignmentData, { headers });
  }

    getAllProjectTeams(): Observable<any> {
      const headers = this.getAuthHeaders(); 
      return this.http.get(`${this.apiUrl}/api/rmg/assignments`, { headers });
    }

    updateAssignTeam(projectTeamId: number, updateData: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put(`${this.apiUrl}/api/rmg/assignments/${projectTeamId}`, updateData, { headers });
    }

    //

    getAllTimesheets(): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get(`${this.apiUrl}/api/rmg/timesheets`, { headers });
    }

    
// In your RmgService class

releaseEmployeeFromProject(projectTeamId: number): Observable<any> {
  const headers = this.getAuthHeaders();
  return this.http.put(`${this.apiUrl}/api/rmg/project-team/${projectTeamId}/release`, {}, { headers });
}



}
