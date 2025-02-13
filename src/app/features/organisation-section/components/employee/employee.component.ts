import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  selectedSection: string = 'employee';
  
  showEmployeeForm: boolean = false;
  showDepartmentForm: boolean = false;
  showDesignationForm: boolean = false;
  showSkillsForm: boolean = false;
  showPermissionForm: boolean = false;
  showPositionForm: boolean = false;
  showReportingManagerForm: boolean = false;
  hasPassport: boolean = false;


  onPassportChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.hasPassport = target.value === 'yes';
  }

reportingManagerHistory = [
    { 
        id: 1, 
        employeeName: 'Jim Halpert', 
        reportingManager: 'Michael Scott',  
        fromDate: '2025-02-01', 
        tillDate: '2025-02-10', 
        createdBy: 'Admin' 
    },
    { 
        id: 2, 
        employeeName: 'Pam Beesly', 
        reportingManager: 'Dwight Schrute',  
        fromDate: '2025-02-05', 
        tillDate: '2025-02-11', 
        createdBy: 'Admin' 
    }
];

  positions = [
    { id: 1, name: 'Manager',activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Developer',activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 3, name: 'Team Lead', activityDate: '2025-02-10', createdBy: 'Admin' }
  ];
  employees = [
    { code: 'E001', firstName: 'John', lastName: 'Doe', email: 'john@example.com', contact: '1234567890', adminRole: 'Yes', designation: 'Manager' },
    { code: 'E002', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', contact: '9876543210', adminRole: 'No', designation: 'Developer' }
  ];

  departments = [
    { id: 1, name: 'HR', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'IT', activityDate: '2025-02-11', createdBy: 'Admin' }
  ];

  designations = [
    { id: 1, name: 'Manager', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Developer', activityDate: '2025-02-10', createdBy: 'Admin' }
  ];

  skills = [
    { id: 1, name: 'Angular', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Node.js', activityDate: '2025-02-10', createdBy: 'Admin' }
  ];

  permissions = [
    { id: 1, name: 'Read', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Write', activityDate: '2025-02-10', createdBy: 'Admin' }
  ];

  // Delete Methods
  deleteEmployee(code: string) {
    this.employees = this.employees.filter(emp => emp.code !== code);
  }

  deleteDepartment(id: number) {
    this.departments = this.departments.filter(dep => dep.id !== id);
  }

  deleteDesignation(id: number) {
    this.designations = this.designations.filter(des => des.id !== id);
  }

  deleteSkill(id: number) {
    this.skills = this.skills.filter(skill => skill.id !== id);
  }

  deletePermission(id: number) {
    this.permissions = this.permissions.filter(permission => permission.id !== id);
  }
  deletePosition(id: number) {
    this.positions = this.positions.filter(pos => pos.id !== id);
  }
  deleteReportingManager(id: number) {
    this.reportingManagerHistory = this.reportingManagerHistory.filter(manager => manager.id !== id);
}


showDesignationModal: boolean = false;
showPositionModal: boolean = false;
showSkillModal: boolean = false;
showPermissionModal: boolean = false;
showReportingManagerModal: boolean = false;
showEmployeeModal: boolean = false;
showDepartmentModal: boolean = false;

toggleModal(type: string) {
    switch (type) {
        case 'designation':
            this.showDesignationModal = !this.showDesignationModal;
            break;
        case 'position':
            this.showPositionModal = !this.showPositionModal;
            break;
        case 'skill':
            this.showSkillModal = !this.showSkillModal;
            break;
        case 'permission':
            this.showPermissionModal = !this.showPermissionModal;
            break;
        case 'reportingManager':
            this.showReportingManagerModal = !this.showReportingManagerModal;
            break;
        case 'employee':
            this.showEmployeeModal = !this.showEmployeeModal;
            break;
        case 'department':
            this.showDepartmentModal = !this.showDepartmentModal;
            break;
    }
}






}
