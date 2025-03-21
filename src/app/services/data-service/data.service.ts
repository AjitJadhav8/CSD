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
  updateCustomer(customerId: number, customerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/customer/${customerId}`, customerData);
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
  updateDepartment(departmentId: number, departmentName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/departments/${departmentId}`, { department_name: departmentName });
  }
  // ------------------ Project Role ------------------------

  addProjectRole(projectRoleName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-role`, { project_role_name: projectRoleName });
  }

  getAllProjectRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-roles`);
  }

  deleteProjectRole(projectRoleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-roles/${projectRoleId}`);
  }
  updateProjectRole(projectRoleId: number, projectRoleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project-roles/${projectRoleId}`, { project_role_name: projectRoleName });
  }

  // ------------------ Designation ------------------------

  addDesignation(designationName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/designation`, { designation_name: designationName });
  }

  getAllDesignations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/designations`);
  }

  deleteDesignation(designationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/designations/${designationId}`);
  }
  updateDesignation(designationId: number, designationName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/designations/${designationId}`, { designation_name: designationName });
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

  updateSkill(skillId: number, skillData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/skills/${skillId}`, skillData);
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

  updateEmployee(employeeId: number, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/employee/${employeeId}`, employeeData);
  }

  // ------------------ Role ------------------------

  addAssignDetails(assignDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/assign-details`, assignDetails);
  }

  getEmployeeDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/employees/${userId}`);
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
  updateReportingManagerHistory(managerId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/reporting-manager-history/${managerId}`, payload);
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

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project/${projectId}`, projectData);
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


    // ------------------ Project Phases ------------------------


  addProjectPhase(projectPhase: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-phase`, projectPhase);
  }
  
  getAllProjectPhases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-phases`);
  }
  
  deleteProjectPhase(phaseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-phases/${phaseId}`);
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
