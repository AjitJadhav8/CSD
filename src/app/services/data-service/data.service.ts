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

      // Fetch Roles and Departments from the backend
  getRolesAndDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/roles-and-departments`);
  }

  // Add a new employee
 addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employee`, employee);  // Sends data as "employee" to backend
  }

    // Method to fetch all employees
    getAllEmployees(): Observable<any> {
      return this.http.get(`${this.apiUrl}/api/employees`);
    }

      // Method to fetch all departments
  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/departments`);
  }

  // Method to fetch all positions
  getAllPositions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/positions`);
  }

  // Method to fetch all skills
  getAllSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/skills`);
  }

    // Delete department
    deleteDepartment(departmentId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/departments/${departmentId}`);
    }

    // Delete position
    deletePosition(positionId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/positions/${positionId}`);
    }

    // Delete skill
    deleteSkill(skillId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/skills/${skillId}`);
    }

    // Soft delete employee
    softDeleteEmployee(employeeId: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/api/employee/${employeeId}`);
    }

    //add a new reporting manager
     // Method to add reporting manager history
  addReportingManagerHistory(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reporting-manager-history`, payload);
  }

  getReportingManagerHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reporting-manager-history`);
}
// Soft delete a reporting manager history entry
deleteReportingManager(managerId: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/reporting-manager-history/${managerId}`);
}




}
