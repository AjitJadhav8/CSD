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

      this.fetchEmployees();
      this.fetchDepartments();
      this.fetchPositions();
      this.fetchSkills();

      this.dataService.getRolesAndDepartments().subscribe(
        (response) => {
          this.roles = response.roles;
          this.departments = response.departments;
        },
        (error) => {
          console.error('Error fetching roles and departments', error);
        }
      );
    
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

roles: any[] = [];
selectedRole: string = '';
selectedDepartment: string = '';



employee = {
  user_code: '',
  user_first_name: '',
  user_middle_name: '',
  user_last_name: '',
  user_email: '',
  user_contact: '',
  user_emergency_contact: '',
  role_id: null,
  department_id: null,
  is_passport: null,
  passport_validity: null,
  user_current_address: '',
  user_DOB: null,
  user_blood_group: '',
  user_DOJ: null
};

submitEmployee() {
  this.dataService.addEmployee(this.employee).subscribe((response) => {
    console.log('Employee saved successfully!', response);
    alert('Employee saved successfully!');
  }, (error) => {
    console.error('Error saving employee:', error);
  });
}

employees: any[] = [];  // Store the employee data

 // Method to fetch employee data
 fetchEmployees(): void {
  this.dataService.getAllEmployees().subscribe(
    (data) => {
      this.employees = data;
    },
    (error) => {
      console.error('Error fetching employees:', error);
    }
  );
}


departments: any[] = [];
  // Fetch departments data from the backend
  fetchDepartments(): void {
    this.dataService.getAllDepartments().subscribe(
      (response) => {
        console.log('Departments Response:', response); // Log the response

        this.departments = response;  // Assuming the response contains the departments data
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  positions:any[] = [];

  fetchPositions(): void {
    this.dataService.getAllPositions().subscribe(
      (response) => {
        console.log('Positions Response:', response); // Log the response

        this.positions = response;  // Assuming the response contains the positions data
      },
      (error) => {
        console.error('Error fetching positions:', error);
      }
    );
  }

  skills:any[] = [];
  fetchSkills(): void {
    this.dataService.getAllSkills().subscribe(
      (response) => {
        console.log('Skills Response:', response); // Log the response

        this.skills = response;  // Assuming the response contains the skills data
      },
      (error) => {
        console.error('Error fetching skills:', error);
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
      this.hasPassport = target.value === '1';
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
