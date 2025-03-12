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

  getOptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/roles-and-departments`);
  }

  // ------------------ Customer ------------------------

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/customer`, customer);
  }

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/customers`);
  }

  softDeleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/customer/${customerId}`);
  }

  // ------------------ Category ------------------------


  addCategory(category: { sector: string; industry: string; domain: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/category`, category);
  }

  getMasterCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/master/categories`);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/customer/category/${categoryId}`);
  }

  // ------------------ Department ------------------------

  addDepartment(departmentName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/department`, { department_name: departmentName });
  }

  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/departments`);
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/departments/${departmentId}`);
  }

  // ------------------ Position ------------------------

  addPosition(positionName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/position`, { position_name: positionName });
  }

  getAllPositions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/positions`);
  }

  deletePosition(positionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/positions/${positionId}`);
  }

  // ------------------ Skills ------------------------

  addSkill(skillData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/skill`, skillData);
  }

  getAllSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/skills`);
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/skills/${skillId}`);
  }



  // ------------------ Employee ------------------------

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employee`, employee);  // Sends data as "employee" to backend
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/employees`);
  }

  softDeleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/employee/${employeeId}`);
  }

  // ------------------ Role ------------------------

  addAssignDetails(assignDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/assign-details`, assignDetails);
  }

  // ------------------ Reporting manager history ------------------------

  addReportingManagerHistory(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reporting-manager-history`, payload);
  }

  getReportingManagerHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reporting-manager-history`);
  }

  deleteReportingManager(managerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/reporting-manager-history/${managerId}`);
  }

  // ------------------ Project ------------------------

  addProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project`, project);
  }

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/projects`);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project/${projectId}`);
  }

  // ------------------ Project Deliverable ------------------------


  addProjectDeliverable(projectDeliverable: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-deliverable`, projectDeliverable);
  }

  getAllProjectDeliverables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-deliverables`);
  }

  deleteProjectDeliverable(deliverableId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-deliverables/${deliverableId}`);
  }

  // ------------------ Task Category ------------------------

  addTaskCategory(taskCategory: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/task-category`, taskCategory);
  }

  getAllTaskCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/task-categories`);
  }

  deleteTaskCategory(taskCatId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/task-categories/${taskCatId}`);
  }
// ------------------------------------------------------------------------------------END OF ORGANISATIO MODULE------------------------------


}
