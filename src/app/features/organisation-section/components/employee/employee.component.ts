import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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
    this.selectedSection = 'employee';
    localStorage.setItem('selectedEmployeeSection', 'employee');
  
    // Load section from localStorage
    this.selectedSection = localStorage.getItem('selectedEmployeeSection') || 'employee';

    // Listen for changes (e.g., when clicking Department)
    window.addEventListener('storage', this.updateSectionFromStorage.bind(this));
    this.fetchEmployees();
    this.fetchDepartments();
    this.fetchPositions();
    this.fetchSkills();
    this.fetchReportingManagerHistory();
    this.dataService.getOptions().subscribe(
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
  ngOnDestroy() {
    window.removeEventListener('storage', this.updateSectionFromStorage.bind(this));
  }

  updateSectionFromStorage() {
    this.selectedSection = localStorage.getItem('selectedEmployeeSection') || 'employee';
  }

  changeSection(section: string) {
    this.selectedSection = section;
    localStorage.setItem('selectedEmployeeSection', section);
  }

  optioRoles: any[] = [];
  optionUsers: any[] = [];
  optionDepartments: any[] = [];

  // ------------------ Department ------------------------

  departmentName = '';


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

  // Add Department
  submitDepartment(departmentForm: NgForm): void {
    if (departmentForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Department Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.addDepartment(this.departmentName).subscribe(
      (response) => {
        this.fetchDepartments();
        console.log('Department added:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Department added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.departmentName = ''; // Reset input field
        departmentForm.resetForm(); // Reset form validation
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
  }

  // Delete department
  deleteDepartment(departmentId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This department will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteDepartment(departmentId).subscribe(
          () => {
            console.log('Department deleted successfully');
            this.fetchDepartments();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Department deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          (error) => {
            console.error('Error deleting department:', error);
          }
        );
      }
    });
  }


  // ------------------ Position ------------------------

  positionName = '';
  positions: any[] = [];

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

  submitPosition(positionForm: NgForm): void {
    if (positionForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Position Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.addPosition(this.positionName).subscribe(
      (response) => {
        this.fetchPositions();
        console.log('Position added:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Position added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.positionName = ''; // Reset input field
        positionForm.resetForm(); // Reset form validation
      },
      (error) => {
        console.error('Error adding position:', error);
      }
    );
  }


  deletePosition(positionId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This position will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deletePosition(positionId).subscribe(
          () => {
            console.log('Position deleted successfully');
            this.fetchPositions();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Position deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          (error) => {
            console.error('Error deleting position:', error);
          }
        );
      }
    });
  }


  // ------------------ Skill ------------------------

  skillName = '';
  skillCategory = '';
  skillDescription = '';
  skills: any[] = [];

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

  submitSkill(skillForm: NgForm): void {
    if (skillForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Skill Name and Category are required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const skillData = {
      skill_name: this.skillName.trim(),
      skill_category: this.skillCategory,
      skill_description: this.skillDescription?.trim() || null,
    };

    this.dataService.addSkill(skillData).subscribe(
      (response) => {
        console.log('Skill added:', response);
        this.fetchSkills();

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Skill added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.skillName = ''; // Reset form fields
        this.skillCategory = '';
        this.skillDescription = '';
        skillForm.resetForm(); // Reset validation states
      },
      (error) => {
        console.error('Error adding skill:', error);
      }
    );
  }


  deleteSkill(skillId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This skill will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteSkill(skillId).subscribe(
          () => {
            console.log('Skill deleted successfully');
            this.fetchSkills();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Skill deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          (error) => {
            console.error('Error deleting skill:', error);
          }
        );
      }
    });
  }


  // ------------------ Employee ------------------------

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

  submitEmployee(employeeForm: NgForm): void {
    if (employeeForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields correctly!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return; // Stop execution if form is invalid
    }

    this.dataService.addEmployee(this.employee).subscribe(
      (response) => {
        console.log('Employee saved successfully!', response);
        this.fetchEmployees();
        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Employee saved successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        employeeForm.resetForm();

      },
      (error) => {
        console.error('Error saving employee:', error);
      }
    );
  }


  deleteEmployee(employeeId: number): void {
    if (employeeId === undefined) {
      console.error('Employee ID is undefined!');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This employee will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.softDeleteEmployee(employeeId).subscribe(
          () => {
            console.log('Employee deleted successfully');
            this.fetchEmployees();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Employee deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

          },
          (error) => {
            console.error('Error deleting employee:', error);
          }
        );
      }
    });
  }


  // ------------------ Reporting Manager  ------------------------


  fromDate: string = '';
  tillDate: string = '';
  reportingManagerHistory: any[] = [];

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

  onSubmitReportingManager(reportingManagerForm: NgForm): void {
    if (reportingManagerForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'All required fields must be filled!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const payload = {
      employee_id: this.employee.selectedUserId,
      reporting_manager_id: this.employee.selectedReportingManagerId,
      from_date: this.fromDate,
      till_date: this.tillDate,
    };

    this.dataService.addReportingManagerHistory(payload).subscribe(
      (response) => {
        console.log('Reporting Manager history added successfully');
        this.fetchReportingManagerHistory(); // Refresh the list after submission

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Reporting Manager assigned successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        reportingManagerForm.resetForm(); // Reset form fields & validation
      },
      (error) => {
        console.error('Error adding reporting manager history', error);
      }
    );
  }



  deleteReportingManager(managerId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This reporting manager history entry will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteReportingManager(managerId).subscribe(
          () => {
            this.fetchReportingManagerHistory(); // Refresh the list after deletion

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Reporting Manager History entry deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

          },
          (error) => {
            console.error('Error deleting reporting manager history:', error);
          }
        );
      }
    });
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

}
