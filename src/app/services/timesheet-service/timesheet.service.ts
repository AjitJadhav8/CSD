import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { 
      
    }
}
