import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;  // Use apiUrl from environment

  constructor(private http: HttpClient) { }


  getMasterCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/master/categories`);
  }

  






}
