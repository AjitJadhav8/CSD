import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RmgService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve token from storage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  submitAssignProjectTeam(assignmentData: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Get headers with token
    return this.http.post(`${this.apiUrl}/api/rmg/assign`, assignmentData, { headers });
  }

    // Fetch all project team assignments
    getAllProjectTeams(): Observable<any> {
      const headers = this.getAuthHeaders(); // Get headers with token
      return this.http.get(`${this.apiUrl}/api/rmg/assignments`, { headers });
    }

    // delete project team assignment
    deleteProjectTeam(id: number): Observable<any> {
      const headers = this.getAuthHeaders(); // Get headers with token
      return this.http.delete(`${this.apiUrl}/api/rmg/assignments/${id}`, { headers });
    }
    


}
