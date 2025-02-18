import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
    constructor(private dataService: DataService,private http: HttpClient) {}

    ngOnInit(): void {
  
    }
  
    showDepartmentForm: boolean = false;
    showDepartmentModal: boolean = false;
  departmentName = '';

 // Add Department
 submitDepartment(): void {
  if (!this.departmentName.trim()) {
    alert('Department Name is required');
    return;
  }

  this.dataService.addDepartment(this.departmentName).subscribe(
    (response) => {
      console.log('Department added:', response);
      alert('Department added successfully');
      this.departmentName = ''; // Reset input field
    },
    (error) => {
      console.error('Error adding department:', error);
    }
  );
}

showPositionForm: boolean = false;
showPositionModal: boolean = false;
positionName = '';
submitPosition(): void {
  if (!this.positionName.trim()) {
    alert('Position Name is required');
    return;
  }

  this.dataService.addPosition(this.positionName).subscribe(
    (response) => {
      console.log('Position added:', response);
      alert('Position added successfully');
      this.positionName = ''; // Reset input field
    },
    (error) => {
      console.error('Error adding position:', error);
    }
  );
}

showSkillsForm: boolean = false;
showSkillModal: boolean = false;
skillName = '';
skillCategory = '';
skillDescription = '';
// Add Skill
submitSkill(): void {
  if (!this.skillName.trim() || !this.skillCategory) {
    alert('Skill Name and Category are required');
    return;
  }

  const skillData = {
    skill_name: this.skillName,
    skill_category: this.skillCategory,
    skill_description: this.skillDescription || null,
  };

  this.dataService.addSkill(skillData).subscribe(
    (response) => {
      console.log('Skill added:', response);
      this.skillName = ''; // Reset form fields
      this.skillCategory = '';
      this.skillDescription = '';
      alert('Skill added successfully');
    },
    (error) => {
      console.error('Error adding skill:', error);
    }
  );
}












  selectedSection: string = 'employee';
  
  showEmployeeForm: boolean = false;
  showReportingManagerForm: boolean = false;
  hasPassport: boolean = false;
  selectedEmployee: any;


  onPassportChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.hasPassport = target.value === 'yes';
  }

  reportingManagers = [
    { id: 1, name: 'Michael Scott' },
    { id: 2, name: 'Dwight Schrute' }
];

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
    {
        id: 1,
        code: 'E001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        contact: '1234567890',
        emergencyContact: '0987654321',
        dob: '1990-01-01',
        bloodGroup: 'O+',
        doj: '2020-06-15',
        passport: 'Yes',
        passportValidity: '2030-12-31',
        reportingManager: 'Michael Scott'
    },
    {
        id: 2,
        code: 'E002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        contact: '9876543210',
        emergencyContact: '1234509876',
        dob: '1995-05-20',
        bloodGroup: 'A+',
        doj: '2022-08-10',
        passport: 'No',
        passportValidity: null,
        reportingManager: 'Pam Beesly'
    }
];

  departments = [
    { id: 1, name: 'HR', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'IT', activityDate: '2025-02-11', createdBy: 'Admin' }
  ];



  skills = [
    { id: 1, name: 'Angular', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Node.js', activityDate: '2025-02-10', createdBy: 'Admin' }
  ];

  // Delete Methods
  deleteEmployee(code: string) {
    this.employees = this.employees.filter(emp => emp.code !== code);
  }

  deleteDepartment(id: number) {
    this.departments = this.departments.filter(dep => dep.id !== id);
  }



  deleteSkill(id: number) {
    this.skills = this.skills.filter(skill => skill.id !== id);
  }


  deletePosition(id: number) {
    this.positions = this.positions.filter(pos => pos.id !== id);
  }
  deleteReportingManager(id: number) {
    this.reportingManagerHistory = this.reportingManagerHistory.filter(manager => manager.id !== id);
}


showReportingManagerModal: boolean = false;
showEmployeeModal: boolean = false;

toggleModal(type: string) {
    switch (type) {

        case 'position':
            this.showPositionModal = !this.showPositionModal;
            break;
        case 'skill':
            this.showSkillModal = !this.showSkillModal;
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

showAssignDetailsModal: boolean = false;

toggleAssignDetailsModal() {
    this.showAssignDetailsModal = !this.showAssignDetailsModal;
}

assignDetails(employee: any) {
    this.selectedEmployee = employee;
    this.toggleAssignDetailsModal();
}





}
