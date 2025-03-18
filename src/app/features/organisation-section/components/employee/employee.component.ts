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
    this.fetchProjectRoles();
    this.fetchSkills();
    this.fetchReportingManagerHistory();
    this.fetchDesignations();
    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Roles and Departments:', response);
        this.optioRoles = response.roles;
        this.optionDepartments = response.departments;
        this.optionUsers = response.users;  // Store user data
        this.optionPositionName = response.projectRole;  // Store position data
        this.optionDesignation = response.designation;  // Store designation data
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
  optionPositionName: any[] = [];
  optionDesignation: any[] = [];


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
  isEditDepartmentModalOpen = false;
  editDepartmentName = '';
  editDepartmentId: number | null = null;
  // Open Edit Modal
  openDepartmentEditModal(department: any): void {
    this.editDepartmentName = department.department_name;
    this.editDepartmentId = department.department_id;
    this.isEditDepartmentModalOpen = true;
  }

  // Close Edit Modal
  closeDepartmentEditModal(): void {
    this.isEditDepartmentModalOpen = false;
    this.editDepartmentName = '';
    this.editDepartmentId = null;
  }

  // Update Department
  updateDepartment(editDepartmentForm: NgForm): void {
    if (editDepartmentForm.invalid || !this.editDepartmentId) {
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

    this.dataService.updateDepartment(this.editDepartmentId, this.editDepartmentName).subscribe(
      (response) => {
        this.fetchDepartments();
        console.log('Department updated:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Department updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.closeDepartmentEditModal();
      },
      (error) => {
        console.error('Error updating department:', error);
      }
    );
  }


  // ------------------ Position- Project Role ------------------------

  projectRoleName = '';
  projectRoles: any[] = [];

  fetchProjectRoles(): void {
    this.dataService.getAllProjectRoles().subscribe(
      (response) => {
        console.log('Project Roles Response:', response);

        this.projectRoles = response;  // Assuming the response contains the positions data
      },
      (error) => {
        console.error('Error fetching project roles:', error);
      }
    );
  }

  submitProjectRole(projectRoleForm: NgForm): void {
    if (projectRoleForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Project Role Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.addProjectRole(this.projectRoleName).subscribe(
      (response) => {
        this.fetchProjectRoles();
        console.log('Project Role added:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project Role added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.projectRoleName = ''; // Reset input field
        projectRoleForm.resetForm(); // Reset form validation
      },
      (error) => {
        console.error('Error adding project role:', error);
      }
    );
  }


  deleteProjectRole(projectRoleId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This project role will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteProjectRole(projectRoleId).subscribe(
          () => {
            console.log('Project Role deleted successfully');
            this.fetchProjectRoles();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Project Role deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          (error) => {
            console.error('Error deleting project role:', error);
          }
        );
      }
    });
  }
  editProjectRoleName = '';
  editProjectRoleId: number | null = null;
  isProjectRoleEditModalOpen = false;
  // Open Edit Modal
  openProjectRoleEditModal(projectRole: any): void {
    this.editProjectRoleName = projectRole.project_role_name;
    this.editProjectRoleId = projectRole.project_role_id;
    this.isProjectRoleEditModalOpen = true;
  }

  // Close Edit Modal
  closeProjectRoleEditModal(): void {
    this.isProjectRoleEditModalOpen = false;
    this.editProjectRoleName = '';
    this.editProjectRoleId = null;
  }

  // Update Project Role
  updateProjectRole(editProjectRoleForm: NgForm): void {
    if (editProjectRoleForm.invalid || !this.editProjectRoleId) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Project Role Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.updateProjectRole(this.editProjectRoleId, this.editProjectRoleName).subscribe(
      (response) => {
        this.fetchProjectRoles();
        console.log('Project Role updated:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project Role updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.closeProjectRoleEditModal();
      },
      (error) => {
        console.error('Error updating project role:', error);
      }
    );
  }
  // ------------------ Designation ------------------------

  designationName = '';
  designations: any[] = [];

  fetchDesignations(): void {
    this.dataService.getAllDesignations().subscribe(
      (response) => {
        console.log('Designations Response:', response);
        this.designations = response;  // Assuming the response contains the designations data
      },
      (error) => {
        console.error('Error fetching designations:', error);
      }
    );
  }

  submitDesignation(designationForm: NgForm): void {
    if (designationForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Designation Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.addDesignation(this.designationName).subscribe(
      (response) => {
        this.fetchDesignations();
        console.log('Designation added:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Designation added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.designationName = ''; // Reset input field
        designationForm.resetForm(); // Reset form validation
      },
      (error) => {
        console.error('Error adding designation:', error);
      }
    );
  }

  deleteDesignation(designationId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This designation will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteDesignation(designationId).subscribe(
          () => {
            console.log('Designation deleted successfully');
            this.fetchDesignations();

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Designation deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          (error) => {
            console.error('Error deleting designation:', error);
          }
        );
      }
    });
  }
  editDesignationName = '';
  editDesignationId: number | null = null;
  isDesignationModalOpen = false;
  // Open Edit Modal
  editDesignationModule(designation: any): void {
    this.editDesignationName = designation.designation_name;
    this.editDesignationId = designation.designation_id;
    this.isDesignationModalOpen = true;
  }

  // Close Edit Modal
  closeDesignationModule(): void {
    this.isDesignationModalOpen = false;
    this.editDesignationName = '';
    this.editDesignationId = null;
  }

  // Update Designation
  updateDesignation(editDesignationForm: NgForm): void {
    if (editDesignationForm.invalid || !this.editDesignationId) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Designation Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.updateDesignation(this.editDesignationId, this.editDesignationName).subscribe(
      (response) => {
        this.fetchDesignations();
        console.log('Designation updated:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Designation updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.closeDesignationModule();
      },
      (error) => {
        console.error('Error updating designation:', error);
      }
    );
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

  editSkillName = '';
  editSkillCategory = '';
  editSkillDescription = '';
  editSkillId: number | null = null;
  isSkillModalOpen = false;
  // Open Edit Modal
  openEditSkillModal(skill: any): void {
    this.editSkillName = skill.skill_name;
    this.editSkillCategory = skill.skill_category;
    this.editSkillDescription = skill.skill_description;
    this.editSkillId = skill.skill_id;
    this.isSkillModalOpen = true;
  }

  // Close Edit Modal
  closeSkillModal(): void {
    this.isSkillModalOpen = false;
    this.editSkillName = '';
    this.editSkillCategory = '';
    this.editSkillDescription = '';
    this.editSkillId = null;
  }

  // Update Skill
  updateSkill(editSkillForm: NgForm): void {
    if (editSkillForm.invalid || !this.editSkillId) {
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
      skill_name: this.editSkillName.trim(),
      skill_category: this.editSkillCategory,
      skill_description: this.editSkillDescription?.trim() || null,
    };

    this.dataService.updateSkill(this.editSkillId, skillData).subscribe(
      (response) => {
        console.log('Skill updated:', response);
        this.fetchSkills();

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Skill updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.closeSkillModal();
      },
      (error) => {
        console.error('Error updating skill:', error);
      }
    );
  }


  // ------------------ Employee ------------------------


  employee = {
    user_first_name: '',
    user_middle_name: '',
    user_last_name: '',
    user_email: '',
    user_contact: '',
    selectedUserId: null, // Add this property
    user_code: '',
    selectedReportingManagerId: null // Add this property
  };
  reportingManagers: any[] = [];
  assignDetailsData = {
    user_id: null,
    user_first_name: '', // Add this property
    user_last_name: '',  // Add this property
    user_emergency_contact: '',
    is_passport: null,
    passport_validity: null,
    user_current_address: '',
    user_DOB: null as string | null,  // Update type
    user_blood_group: '',
    user_DOJ: null as string | null,  // Update type
    reporting_manager_id: null,
    designation_id: null,
    is_timesheet_required: null,
    department_id: null,
    role_id: null
  };
  employees: any[] = [];
  activeTab: 'personal' | 'organizational' | 'application' = 'personal';

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
      return;
    }

    this.dataService.addEmployee(this.employee).subscribe(
      (response) => {
        console.log('Employee saved successfully!', response);
        this.fetchEmployees();
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

  formatDate(dateString: string): string | null {
    if (!dateString) return null;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null; // Check for invalid date

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  assignDetails(employee: any): void {
    // Fetch employee details from the backend
    this.dataService.getEmployeeDetails(employee.user_id).subscribe(
      (data) => {

        const formattedDOB = this.formatDate(data.user_DOB);
        const formattedDOJ = this.formatDate(data.user_DOJ);

        // Populate assignDetailsData with the fetched data
        this.assignDetailsData = {
          user_id: data.user_id,
          user_first_name: data.user_first_name,
          user_last_name: data.user_last_name,
          user_emergency_contact: data.user_emergency_contact || '',
          is_passport: data.is_passport || null,
          passport_validity: data.passport_validity || null,
          user_current_address: data.user_current_address || '',
          user_DOB: formattedDOB, // Use formatted date
          user_blood_group: data.user_blood_group || '',
          user_DOJ: formattedDOJ, // Use formatted date
          reporting_manager_id: data.reporting_manager_id || null,
          designation_id: data.designation_id || null,
          is_timesheet_required: data.is_timesheet_required || null,
          department_id: data.department_id || null,
          role_id: data.role_id || null
        };
        console.log('assssign', this.assignDetailsData);

        // Show the modal
        this.showAssignDetailsModal = true;
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }


  submitAssignDetails(assignDetailsForm: NgForm): void {
    if (assignDetailsForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields correctly!',
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }

    this.dataService.addAssignDetails(this.assignDetailsData).subscribe(
      (response) => {
        console.log('Details assigned successfully!', response);
        this.fetchEmployees();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Details assigned successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.showAssignDetailsModal = false;
        assignDetailsForm.resetForm();
      },
      (error) => {
        console.error('Error assigning details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to assign details. Please try again.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  fetchEmployees(): void {
    this.dataService.getAllEmployees().subscribe(
      (data) => {
        this.employees = data;
        this.applyFilters(); // Apply filters after fetching data

        console.log('fetch employeee0', this.employees)
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
  showAssignDetailsModal: boolean = false;

  toggleAssignDetailsModal() {
    this.showAssignDetailsModal = !this.showAssignDetailsModal;
  }

  employeeCodeFilter: string = '';
  nameFilter: string = '';
  emailFilter: string = '';
  departmentFilter: string = '';
  designationFilter: string = '';
  addressFilter: string = '';
  reportingManagerFilter: string = '';
  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;

  // Filtered and paginated data
  filteredEmployees: any[] = [];
  paginatedEmployees: any[] = [];
  // Apply Filters
  applyFilters(): void {
    this.filteredEmployees = this.employees.filter((employee) => {
      return (
        (!this.employeeCodeFilter ||
          employee.user_code?.toLowerCase().includes(this.employeeCodeFilter.toLowerCase())) &&

        (!this.nameFilter ||
          employee.user_id?.toString() === this.nameFilter.toString()) &&



        (!this.emailFilter ||
          employee.user_email?.toLowerCase().includes(this.emailFilter.toLowerCase())) &&
        (!this.departmentFilter ||
          employee.department_id?.toString() === this.departmentFilter.toString()) && // Convert both to string

        (!this.designationFilter ||
          employee.designation_id?.toString() === this.designationFilter.toString()) && // Convert both to string
        (!this.addressFilter ||
          employee.user_current_address?.toLowerCase().includes(this.addressFilter.toLowerCase())) &&
        (!this.reportingManagerFilter ||
          employee.reporting_manager_id?.toString() === this.reportingManagerFilter.toString()) // Convert both to string
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }


  // Clear Filters
  clearFilters(): void {
    this.employeeCodeFilter = '';
    this.nameFilter = '';
    this.emailFilter = '';
    this.departmentFilter = '';
    this.designationFilter = '';
    this.reportingManagerFilter = '';
    this.addressFilter = '';
    this.applyFilters();
  }

  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }


  // Pagination
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  getVisiblePageNumbers(): number[] {
    const totalPages = this.totalPages;
    const halfRange = Math.floor(this.maxPageButtons / 2);

    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);

    if (endPage - startPage + 1 < this.maxPageButtons) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  editEmployee = {
    user_id: null,
    user_first_name: '',
    user_middle_name: '',
    user_last_name: '',
    user_email: '',
    user_contact: '',
    user_code: '',
  };
  isEmployeeEditModalOpen = false;
   // Open Edit Modal
   openEmployeeEditModal(employee: any): void {
    this.editEmployee = { ...employee };
    this.isEmployeeEditModalOpen = true;
  }

  // Close Edit Modal
  closeEmployeeEditModal(): void {
    this.isEmployeeEditModalOpen = false;
    this.editEmployee = {
      user_id: null,
      user_first_name: '',
      user_middle_name: '',
      user_last_name: '',
      user_email: '',
      user_contact: '',
      user_code: '',
    };
  }

    // Update Employee
    updateEmployee(editEmployeeForm: NgForm): void {
      if (editEmployeeForm.invalid || !this.editEmployee.user_id) {
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
  
      this.dataService.updateEmployee(this.editEmployee.user_id, this.editEmployee).subscribe(
        (response) => {
          console.log('Employee updated successfully');
          this.fetchEmployees(); // Refresh the list after update
  
          // Success Toast Notification
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Employee updated successfully!',
            showConfirmButton: false,
            timer: 3000
          });
  
          this.closeEmployeeEditModal();
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
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


  editFromDate: string = '';
  editTillDate: string = '';
  editEmployeeId: number | null = null;
  editReportingManagerId: number | null = null;
  editReportingManagerHistoryId: number | null = null;
  isEditModalOpen = false;
  // Open Edit Modal
  openEditModal(manager: any): void {
    this.editEmployeeId = manager.employee_id;
    this.editReportingManagerId = manager.reporting_manager_id;
    this.editFromDate = manager.from_date;
    this.editTillDate = manager.till_date;
    this.editReportingManagerHistoryId = manager.reporting_manager_history_id;
    this.isEditModalOpen = true;
  }

  // Close Edit Modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editEmployeeId = null;
    this.editReportingManagerId = null;
    this.editFromDate = '';
    this.editTillDate = '';
    this.editReportingManagerHistoryId = null;
  }

  // Update Reporting Manager History
  updateReportingManager(editReportingManagerForm: NgForm): void {
    if (editReportingManagerForm.invalid || !this.editReportingManagerHistoryId) {
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
      employee_id: this.editEmployeeId,
      reporting_manager_id: this.editReportingManagerId,
      from_date: this.editFromDate,
      till_date: this.editTillDate,
    };

    this.dataService.updateReportingManagerHistory(this.editReportingManagerHistoryId, payload).subscribe(
      (response) => {
        console.log('Reporting Manager history updated successfully');
        this.fetchReportingManagerHistory(); // Refresh the list after update

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Reporting Manager history updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating reporting manager history', error);
      }
    );
  }
  // ------------------ Other  ------------------------

  hasPassport: boolean = false;
  onPassportChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.hasPassport = target.value === '1';
  }


  selectedEmployee: any;


  selectedSection: string = 'employee';

}
