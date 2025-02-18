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

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/customer`, customer);
  }

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/customers`);
}
 // Soft delete customer
 softDeleteCustomer(customerId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/customer/${customerId}`);
}

  // Fetch customer domains from the backend
  getCustomerDomains(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/customer/domains`);
  }

    // Soft delete a domain by ID
    deleteDomain(domainId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/customer/domains/${domainId}`);
    }

      // Add a new department
  addDepartment(departmentName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/department`, { department_name: departmentName });
  }

  // Add a new position
  addPosition(positionName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/position`, { position_name: positionName });
  }

    // Add a new skill
    addSkill(skillData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/skill`, skillData);
    }

}
