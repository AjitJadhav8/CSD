import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SecureStorageService } from '../secureStorage-service/secure-storage.service';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl;  // Use apiUrl from environment

  constructor(private http: HttpClient,     private secureStorage: SecureStorageService  ) { }
  private getAuthHeaders(): HttpHeaders {
    const token = this.secureStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }


  // getOptions(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/roles-and-departments`);
  // }

  getOptions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/roles-and-departments`, { 
      headers: this.getAuthHeaders() 
    });
  }

  // ------------------ Customer ------------------------

  // createCustomer(customer: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/api/customer`, customer);
  // }

  // getCustomers(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/customers`);
  // }

  // softDeleteCustomer(customerId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/customer/${customerId}`);
  // }
  // updateCustomer(customerId: number, customerData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/customer/${customerId}`, customerData);
  // }

  createCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/customer`, customer, { 
      headers: this.getAuthHeaders() 
    });
  }

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/customers`, { 
      headers: this.getAuthHeaders() 
    });
  }

  softDeleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/customer/${customerId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateCustomer(customerId: number, customerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/customer/${customerId}`, customerData, { 
      headers: this.getAuthHeaders() 
    });
  }


  // ------------------ Category ------------------------


  // addCategory(category: { sector: string; industry: string; domain: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/category`, category);
  // }

  // getMasterCategories(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/master/categories`);
  // }

  // deleteCategory(categoryId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/customer/category/${categoryId}`);
  // }
  // updateCategory(categoryId: number, payload: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/category/${categoryId}`, payload);
  // }

  addCategory(category: { sector: string; industry: string; domain: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/category`, category, { 
      headers: this.getAuthHeaders() 
    });
  }

  getMasterCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/master/categories`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/customer/category/${categoryId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateCategory(categoryId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/category/${categoryId}`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }
  // ------------------ Department ------------------------

  // addDepartment(departmentName: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/department`, { department_name: departmentName });
  // }

  // getAllDepartments(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/departments`);
  // }

  // deleteDepartment(departmentId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/departments/${departmentId}`);
  // }
  // updateDepartment(departmentId: number, departmentName: string): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/departments/${departmentId}`, { department_name: departmentName });
  // }

  addDepartment(departmentName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/department`, { department_name: departmentName }, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/departments`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteDepartment(departmentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/departments/${departmentId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateDepartment(departmentId: number, departmentName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/departments/${departmentId}`, { department_name: departmentName }, { 
      headers: this.getAuthHeaders() 
    });
  }
  // ------------------ Project Role ------------------------

  // addProjectRole(projectRoleName: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/project-role`, { project_role_name: projectRoleName });
  // }

  // getAllProjectRoles(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/project-roles`);
  // }

  // deleteProjectRole(projectRoleId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/project-roles/${projectRoleId}`);
  // }
  // updateProjectRole(projectRoleId: number, projectRoleName: string): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/project-roles/${projectRoleId}`, { project_role_name: projectRoleName });
  // }

  addProjectRole(projectRoleName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-role`, { project_role_name: projectRoleName }, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllProjectRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-roles`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteProjectRole(projectRoleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-roles/${projectRoleId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProjectRole(projectRoleId: number, projectRoleName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project-roles/${projectRoleId}`, { project_role_name: projectRoleName }, { 
      headers: this.getAuthHeaders() 
    });
  }

  // ------------------ Designation ------------------------

  // addDesignation(designationName: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/designation`, { designation_name: designationName });
  // }

  // getAllDesignations(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/designations`);
  // }

  // deleteDesignation(designationId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/designations/${designationId}`);
  // }
  // updateDesignation(designationId: number, designationName: string): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/designations/${designationId}`, { designation_name: designationName });
  // }

  addDesignation(designationName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/designation`, { designation_name: designationName }, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllDesignations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/designations`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteDesignation(designationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/designations/${designationId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateDesignation(designationId: number, designationName: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/designations/${designationId}`, { designation_name: designationName }, { 
      headers: this.getAuthHeaders() 
    });
  }


  // ------------------ Skills ------------------------

  // addSkill(skillData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/skill`, skillData);
  // }

  // getAllSkills(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/skills`);
  // }

  // deleteSkill(skillId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/skills/${skillId}`);
  // }

  // updateSkill(skillId: number, skillData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/skills/${skillId}`, skillData);
  // }

  addSkill(skillData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/skill`, skillData, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllSkills(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/skills`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/skills/${skillId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateSkill(skillId: number, skillData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/skills/${skillId}`, skillData, { 
      headers: this.getAuthHeaders() 
    });
  }


  // ------------------ Employee ------------------------

  // addEmployee(employee: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/employee`, employee); 
  // }

  // getAllEmployees(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/employees`);
  // }

  // softDeleteEmployee(employeeId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/employee/${employeeId}`);
  // }

  // updateEmployee(employeeId: number, employeeData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/employee/${employeeId}`, employeeData);
  // }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/employee`, employee, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/employees`, { 
      headers: this.getAuthHeaders() 
    });
  }

  softDeleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/employee/${employeeId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateEmployee(employeeId: number, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/employee/${employeeId}`, employeeData, { 
      headers: this.getAuthHeaders() 
    });
  }


  // ------------------ Role ------------------------

  // addAssignDetails(assignDetails: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/assign-details`, assignDetails);
  // }

  // getEmployeeDetails(userId: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/api/employees/${userId}`);
  // }

  addAssignDetails(assignDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/assign-details`, assignDetails, { 
      headers: this.getAuthHeaders() 
    });
  }

  getEmployeeDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/employees/${userId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  // ------------------ Reporting manager history ------------------------

  // addReportingManagerHistory(payload: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/reporting-manager-history`, payload);
  // }

  // getReportingManagerHistory(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/reporting-manager-history`);
  // }

  // deleteReportingManager(managerId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/reporting-manager-history/${managerId}`);
  // }
  // updateReportingManagerHistory(managerId: number, payload: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/reporting-manager-history/${managerId}`, payload);
  // }

  addReportingManagerHistory(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reporting-manager-history`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }

  getReportingManagerHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/reporting-manager-history`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteReportingManager(managerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/reporting-manager-history/${managerId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateReportingManagerHistory(managerId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/reporting-manager-history/${managerId}`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }


  // ------------------ Project ------------------------

  // addProject(project: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/project`, project);
  // }

  // getAllProjects(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/projects`);
  // }

  // deleteProject(projectId: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/api/project/${projectId}`);
  // }

  // updateProject(projectId: number, projectData: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/api/project/${projectId}`, projectData);
  // }


  addProject(project: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project`, project, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/projects`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project/${projectId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project/${projectId}`, projectData, { 
      headers: this.getAuthHeaders() 
    });
  }

  // ------------------ Peoject Manager History ------------------------


  // getProjectManagerHistory(projectId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/api/projects/${projectId}/manager-history`);
  // }

  getProjectManagerHistory(projectId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/projects/${projectId}/manager-history`, { 
      headers: this.getAuthHeaders() 
    });
  }

  // ------------------ Project Deliverable ------------------------


  addProjectDeliverable(projectDeliverable: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-deliverable`, projectDeliverable, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllProjectDeliverables(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-deliverables`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteProjectDeliverable(deliverableId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-deliverables/${deliverableId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProjectDeliverable(deliverableId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project-deliverables/${deliverableId}`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }




// ------------------ Manager Specific ------------------------

  addProjectDeliverableManager(projectDeliverable: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/manager/project-deliverable`, projectDeliverable, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProjectDeliverableManager(deliverableId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/manager/project-deliverables/${deliverableId}`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }

  
  // ------------------ Project Phases ------------------------



  addProjectPhase(projectPhase: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/project-phase`, projectPhase, { 
      headers: this.getAuthHeaders() 
    });
  }

  getAllProjectPhases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/project-phases`, { 
      headers: this.getAuthHeaders() 
    });
  }

  deleteProjectPhase(phaseId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/project-phases/${phaseId}`, { 
      headers: this.getAuthHeaders() 
    });
  }

  updateProjectPhase(phaseId: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/project-phases/${phaseId}`, payload, { 
      headers: this.getAuthHeaders() 
    });
  }


// ------------------ Manager Specific ------------------------


  getManagerProjectDeliverables(managerId: number): Observable<any> {
    if (!managerId) {
      throw new Error('Manager ID is required');
    }
    return this.http.get(`${this.apiUrl}/api/manager/${managerId}/project-deliverables`, { 
      headers: this.getAuthHeaders() 
    });
  }

  getManagerProjectPhases(managerId: number): Observable<any> {
    if (!managerId) {
      throw new Error('Manager ID is required');
    }
    return this.http.get(`${this.apiUrl}/api/manager/${managerId}/project-phases`, { 
      headers: this.getAuthHeaders() 
    });
  }


  getManagerProjects(managerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/manager-projects/${managerId}`, { 
      headers: this.getAuthHeaders() 
    });
  }



  // ------------------------------------------------------------------------------------END OF ORGANISATIO MODULE------------------------------


}
