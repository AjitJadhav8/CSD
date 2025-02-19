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
  users: any;
    constructor(private dataService: DataService,private http: HttpClient) {}

    ngOnInit(): void {

      this.fetchEmployees();
      this.fetchDepartments();
      this.fetchPositions();
      this.fetchSkills();
      this.fetchReportingManagerHistory();


      this.dataService.getRolesAndDepartments().subscribe(
        (response) => {
          console.log('Roles and Departments:', response);
          this.roles = response.roles;
          this.departments = response.departments;
          this.users = response.users;  // Store user data
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
      this.fetchDepartments();
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
      this.fetchPositions();
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
      this.fetchSkills();
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


selectedManager: any;  // This will store the selected manager's ID

employee = {
  selectedUserId: null,   // For selected employee
  selectedReportingManagerId: null, // For selected reporting manager
  user_id: null,  // Add user_id here
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
  this.dataService.addEmployee(this.employee).subscribe((response) => 
    {
    this.fetchEmployees();
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




  // Delete department
  deleteDepartment(departmentId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?');
  
    if (confirmDelete) {
      this.dataService.deleteDepartment(departmentId).subscribe(
        () => {
          this.fetchDepartments();
          alert('Department deleted successfully');
        },
        (error) => {
          console.error('Error deleting department:', error);
        }
      );
    }
  }

  // Delete position
  deletePosition(positionId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this position?');
  
    if (confirmDelete) {
      this.dataService.deletePosition(positionId).subscribe(
        () => {
          this.fetchPositions();
          alert('Position deleted successfully');
        },
        (error) => {
          console.error('Error deleting position:', error);
        }
      );
    }
  }

  // Delete skill
  deleteSkill(skillId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this skill?');
  
    if (confirmDelete) {
      this.dataService.deleteSkill(skillId).subscribe(
        () => {
          this.fetchSkills();
          alert('Skill deleted successfully');
        },
        (error) => {
          console.error('Error deleting skill:', error);
        }
      );
    }
  }

  // Soft delete employee
  deleteEmployee(employeeId: number): void {
    if (employeeId === undefined) {
      console.error('Employee ID is undefined!');
      return;
    }
  
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    
    if (confirmDelete) {
      this.dataService.softDeleteEmployee(employeeId).subscribe(
        () => {
          this.fetchEmployees();
          alert('Employee deleted successfully');
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
  

  fromDate: string = '';   // For from date
  tillDate: string = '';   // For till date
  onSubmitReportingManager() {
    const payload = {
      employee_id: this.employee.selectedUserId,
      reporting_manager_id: this.employee.selectedReportingManagerId,
      from_date: this.fromDate,
      till_date: this.tillDate,
    };

    this.dataService.addReportingManagerHistory(payload).subscribe(
      (response) => {
        console.log('Reporting Manager history added successfully');
        this.toggleModal('reportingManager'); // Close the modal on success
      },
      (error) => {
        console.error('Error adding reporting manager history', error);
      }
    );
  }

  reportingManagerHistory: any[] = [];  // Use any[] to allow any shape of object

  fetchReportingManagerHistory(): void {
    this.dataService.getReportingManagerHistory().subscribe(
        (response) => {
          console.log('Reporting Manager History:', response);  // Log the response to check

          this.reportingManagerHistory = response;  // Directly assign the response as it is an array
        },
        (error) => {
            console.error('Error fetching reporting manager history', error);
        }
    );
}

// Soft delete Reporting Manager history
deleteReportingManager(managerId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this reporting manager history entry?');

  if (confirmDelete) {
    this.dataService.deleteReportingManager(managerId).subscribe(
      () => {
        this.fetchReportingManagerHistory(); // Refresh the list after deletion
        alert('Reporting Manager History entry deleted successfully');
      },
      (error) => {
        console.error('Error deleting reporting manager history:', error);
      }
    );
  }
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
