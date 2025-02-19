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
  constructor(private dataService: DataService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchDepartments();
    this.fetchPositions();
    this.fetchSkills();
    this.fetchReportingManagerHistory();
    this.dataService.getRolesAndDepartments().subscribe(
      (response) => {
        console.log('Roles and Departments:', response);
        this.optioRoles = response.roles;
        this.optionDepartments = response.departments;
        this.optionUsers = response.users;  // Store user data
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );

  }

  optioRoles: any[] = [];
  optionUsers: any[] = [];
  optionDepartments: any[] = [];

  // ------------------ Department ------------------------

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

  // Fetch departments data from the backend
  fetchDepartments(): void {
    this.dataService.getAllDepartments().subscribe(
      (response) => {
        console.log('Departments Response:', response); // Log the response

        this.optionDepartments = response;  // Assuming the response contains the departments data
      },
      (error) => {
        console.error('Error fetching departments:', error);
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

  // ------------------ Position ------------------------

  showPositionModal: boolean = false;
  positionName = '';
  positions: any[] = [];

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

  // ------------------ Skill ------------------------

  showSkillModal: boolean = false;
  skillName = '';
  skillCategory = '';
  skillDescription = '';
  skills: any[] = [];

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

  // ------------------ Employee ------------------------

  showEmployeeModal: boolean = false;
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
  employees: any[] = [];

  submitEmployee() {
    this.dataService.addEmployee(this.employee).subscribe((response) => {
      this.fetchEmployees();
      console.log('Employee saved successfully!', response);
      alert('Employee saved successfully!');
    }, (error) => {
      console.error('Error saving employee:', error);
    });
  }

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

  // ------------------ Reporting Manager  ------------------------

  showReportingManagerModal: boolean = false;
  fromDate: string = '';
  tillDate: string = '';
  reportingManagerHistory: any[] = [];

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

  fetchReportingManagerHistory(): void {
    this.dataService.getReportingManagerHistory().subscribe(
      (response) => {
        console.log('Reporting Manager History:', response);
        this.reportingManagerHistory = response;
      },
      (error) => {
        console.error('Error fetching reporting manager history', error);
      }
    );
  }

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


  // ------------------ Other  ------------------------

  hasPassport: boolean = false;
  onPassportChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.hasPassport = target.value === '1';
  }


  selectedEmployee: any;
  showAssignDetailsModal: boolean = false;
  assignDetails(employee: any) {
    this.selectedEmployee = employee;
    this.toggleAssignDetailsModal();
  }
  toggleAssignDetailsModal() {
    this.showAssignDetailsModal = !this.showAssignDetailsModal;
  }

  selectedSection: string = 'employee';
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
}
