import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm, NgSelectOption } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RmgService } from '../../../../services/rmg-service/rmg.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-assign-project-team',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './assign-project-team.component.html',
  styleUrl: './assign-project-team.component.css'
})
export class AssignProjectTeamComponent {
  selectedProjectManagerName: string | undefined;
  constructor(private dataService: DataService, private http: HttpClient, private rmgService: RmgService) { }

  userId: number | null = null;
  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filteredProjects: any[] = [];
  optionEmployees: any[] = [];
  optionProjectRoles: any[] = [];
  optionProjectManagers: any[] = [];


  ngOnInit(): void {
    this.fetchAssignedProjectTeams();

    const storedUserId = localStorage.getItem('user_id');
    console.log('Stored User ID:', storedUserId);
    if (storedUserId) {
      this.userId = Number(storedUserId);
      console.log('User ID successfully set:', this.userId);
    } else {
      console.error('User ID not found in local storage. Ensure login process stores it.');
    }
    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Fetched Data:', response);
        this.optionEmployees = response.users;
        this.optionProjectManagers = response.projectManagers;
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionProjectRoles = response.projectRole;
        console.log(this.optionCustomers);
        console.log(this.optionProjects);
        console.log(this.optionEmployees);
        console.log('roles', this.optionProjectRoles);
        console.log(this.optionProjectManagers);

      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }

  allocationPercentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  selectedBillingPercentage: number = 0; 
  percentageOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; 
  selectedCustomerId: number | null = null;


  onAllocationStatusChange() {
    if (this.selectedAllocationStatus === 0) { // If Shadow is selected
      this.selectedBilledStatus = 0; // Set to Not Billed
      this.selectedBillingPercentage = 0; // Set Billing Percentage to 0
    }
  }


  selectedAllocationStatus: number = 0; // Default to Shadow (0)


  toggleAllocationStatus(): void {
    this.selectedAllocationStatus = this.selectedAllocationStatus === 1 ? 0 : 1;
    
    // When switching to Shadow mode, reset billing-related fields
    if (this.selectedAllocationStatus === 0) {
        this.selectedBilledStatus = 0;
        this.selectedBillingPercentage = 0;
    }
}

  selectedBilledStatus: number = 0; // Default to Not Billed (0)

  toggleBilledStatus(): void {
    // Can't toggle if in Shadow mode
    if (this.selectedAllocationStatus === 0) return;

    this.selectedBilledStatus = this.selectedBilledStatus === 1 ? 0 : 1;

    // When switching to Not Billed, reset billing percentage
    if (this.selectedBilledStatus === 0) {
        this.selectedBillingPercentage = 0;
    } else {
        // When switching to Billed, set default if not set
        if (this.selectedBillingPercentage === null || this.selectedBillingPercentage === 0) {
            this.selectedBillingPercentage = this.percentageOptions[0] || 100;
        }
    }
}


  selectedProjectId: number | null = null;
  selectedEmployeeId: number | null = null;
  selectedProjectRoleId: number | null = null;
  selectedProjectManagerId: number | null = null;
  selectedAllocationPercentage: number = 0; // Default to 0%
  startDate: string | null = null;
  tentativeEndDate: string | null = null;


  submitAssignProjectTeam() {
    // Validate required fields
    if (!this.selectedCustomerId || !this.selectedProjectId || !this.selectedEmployeeId ||
      !this.selectedProjectRoleId || this.selectedAllocationStatus === null ||
      this.selectedAllocationStatus === undefined || this.selectedBilledStatus === null ||
      this.selectedBilledStatus === undefined || !this.startDate) {

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'All fields are required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Validate allocation percentage if in Employee mode
    if (this.selectedAllocationPercentage === null || this.selectedAllocationPercentage < 0 || this.selectedAllocationPercentage > 100) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please select a valid allocation percentage (0-100)!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Validate billing percentage if in Billed mode
    if (this.selectedAllocationStatus === 1 && this.selectedBilledStatus === 1 &&
      (this.selectedBillingPercentage === null || this.selectedBillingPercentage <= 0)) {
      Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Please select a valid billing percentage for Billed mode!',
          showConfirmButton: false,
          timer: 3000
      });
      return;
  }

    // Validate dates
    if (this.tentativeEndDate && new Date(this.startDate) > new Date(this.tentativeEndDate)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Start date must be before or equal to end date!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const assignmentData = {
      customer_id: this.selectedCustomerId,
      project_id: this.selectedProjectId,
      employee_id: this.selectedEmployeeId,
      project_role_id: this.selectedProjectRoleId,
      project_manager_id: this.selectedProjectManagerId,
      start_date: this.startDate,
      end_date: this.tentativeEndDate || null,
      allocation_status: this.selectedAllocationStatus,
      allocation_percentage: Number(this.selectedAllocationPercentage), // Always send the selected percentage

      billed_status: this.selectedBilledStatus,
      billing_percentage: this.selectedBilledStatus === 1
        ? Number(this.selectedBillingPercentage)
        : 0
    };

    this.rmgService.submitAssignProjectTeam(assignmentData).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project team assigned successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        this.fetchAssignedProjectTeams();
        this.clearAssignForm();
      },
      error: (error) => {
        if (error.status === 400) {
          const errorMessage = error.error.error;

          if (errorMessage.includes('Employee is already assigned to this project')) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Employee is already assigned to this project!',
              showConfirmButton: false,
              timer: 3000
            });
          }
          else if (errorMessage.includes('Only')) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: errorMessage,
              showConfirmButton: false,
              timer: 3000
            });
          }
          else if (errorMessage.includes('start_date must be before or equal to end_date')) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Start date must be before or equal to end date!',
              showConfirmButton: false,
              timer: 3000
            });
          }
          else if (errorMessage.includes('allocation_percentage must be a number between 0 and 100')) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Allocation percentage must be between 0 and 100!',
              showConfirmButton: false,
              timer: 3000
            });
          }
          else {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Failed to assign project team!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        } else {
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Failed to assign project team!',
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    });
  }
  clearAssignForm() {
    this.selectedCustomerId = null;
    this.selectedProjectId = null;
    this.selectedEmployeeId = null;
    this.selectedProjectRoleId = null;
    this.selectedProjectManagerId = null;
    this.startDate = null;
    this.tentativeEndDate = null;
    this.selectedAllocationStatus = 0;
    this.selectedAllocationPercentage = 0;
    this.selectedBilledStatus = 0;
    this.selectedBillingPercentage = 0;
  }

  fetchAssignedProjectTeams(): void {
    this.rmgService.getAllProjectTeams().subscribe(
      (response) => {
        this.assignedProjectTeams = response;
        this.filteredAssignedProjectTeams = [...this.assignedProjectTeams];
        this.totalItems = this.filteredAssignedProjectTeams.length;
        this.updatePage();

        console.log('Fetched Project Teams:', this.assignedProjectTeams);
      },
      (error) => {
        console.error('Error fetching project teams:', error);
      }
    );
  }
  // delete project team
  deleteAssignProjectTeam(projectTeamId: number): void {
    console.log('Deleting Project Team:', projectTeamId);

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this project team assignment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rmgService.deleteProjectTeam(projectTeamId).subscribe({
          next: (response) => {
            console.log('Project Team Deleted:', response);

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Project team deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

            setTimeout(() => this.fetchAssignedProjectTeams(), 100);
          },
          error: (error) => {
            console.error('Error deleting project team:', error);

            // Error Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Failed to delete project team!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    });
  }

  onProjectChange(projectId: any) {
    if (projectId) {
      const selectedProject = this.filteredProjects.find(project => project.project_id === +projectId);
      if (selectedProject) {
        this.selectedProjectManagerId = selectedProject.project_manager_id;

        // Find the manager's name using the project_manager_id
        const selectedManager = this.optionProjectManagers.find(manager => manager.user_id === this.selectedProjectManagerId);
        this.selectedProjectManagerName = selectedManager ? `${selectedManager.user_first_name} ${selectedManager.user_last_name}` : 'Not Assigned';
      }
    } else {
      this.selectedProjectManagerId = null;
      this.selectedProjectManagerName = 'Not Assigned';
    }
  }

  // Method to filter projects based on selected customer
  filterProjects(): void {
    const customerId = Number(this.selectedCustomerId); // Ensure it's a number

    this.selectedProjectId = null;
    this.selectedProjectManagerId = null;
    this.selectedProjectManagerName = 'Not Assigned';

    if (customerId) {
      this.filteredProjects = this.optionProjects.filter(
        project => Number(project.customer_id) === customerId
      );
    } else {
      this.filteredProjects = [];
    }

    console.log("Selected Customer ID:", customerId);
    console.log("Filtered Projects:", this.filteredProjects);
  }


  isEditModalOpen = false;
  editSelectedCustomerId: number | null = null;
  editSelectedProjectId: number | null = null;
  editSelectedEmployeeId: number | null = null;
  editSelectedProjectRoleId: number | null = null;
  editStartDate: string = '';
  editTentativeEndDate: string = '';
  editSelectedAllocationStatus: number = 0;
  editSelectedAllocationPercentage: number | null = null;
  editSelectedBilledStatus: number = 0;
  editSelectedBillingPercentage: number | null = null;
  editProjectTeamId: number | null = null;

  // updateAssignTeam(form: NgForm): void {
  //   const isAllocationValid = this.editSelectedAllocationStatus === 0 || 
  //                          (this.editSelectedAllocationStatus === 1 && 
  //                           this.editSelectedAllocationPercentage !== null &&
  //                           this.editSelectedAllocationPercentage > 0);

  //   const isBillingValid = this.editSelectedBilledStatus === 0 ||
  //                         (this.editSelectedBilledStatus === 1 && 
  //                          this.editSelectedBillingPercentage !== null &&
  //                          this.editSelectedBillingPercentage > 0);

  //   if (!this.editProjectTeamId || !isAllocationValid || !isBillingValid || 
  //       !this.editSelectedCustomerId || !this.editSelectedProjectId || 
  //       !this.editSelectedEmployeeId || !this.editSelectedProjectRoleId || 
  //       !this.editStartDate) {
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',
  //       icon: 'warning',
  //       title: 'Please fill all required fields correctly!',
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //     return;
  //   }

  //   const updateData = {
  //     customer_id: this.editSelectedCustomerId,
  //     project_id: this.editSelectedProjectId,
  //     employee_id: this.editSelectedEmployeeId,
  //     project_role_id: this.editSelectedProjectRoleId,
  //     start_date: this.formatDate(this.editStartDate),
  //     end_date: this.formatDate(this.editTentativeEndDate) || null,
  //     allocation_status: this.editSelectedAllocationStatus,
  //     allocation_percentage: this.editSelectedAllocationStatus === 0 ? 0 : Number(this.editSelectedAllocationPercentage),
  //     billed_status: this.editSelectedBilledStatus,
  //     billing_percentage: this.editSelectedBilledStatus === 0 ? 0 : Number(this.editSelectedBillingPercentage)
  //   };
  //   console.log("Update Data: ", updateData); 


  //   this.rmgService.updateAssignTeam(this.editProjectTeamId, updateData).subscribe({
  //     next: (response) => {
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Assign Team updated successfully!',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });

  //       this.fetchAssignedProjectTeams(); 
  //       this.closeEditModal();
  //     },
  //     error: (error) => {
  //       console.error('Error updating assign team:', error);
  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         icon: 'error',
  //         title: 'Failed to update assign team!',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     }
  //   });
  // }
  updateAssignTeam(form: NgForm): void {
    // Validate required fields
    if (!this.editProjectTeamId || !this.editSelectedCustomerId ||
      !this.editSelectedProjectId || !this.editSelectedEmployeeId ||
      !this.editSelectedProjectRoleId || !this.editStartDate) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all required fields!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Validate allocation percentage if in Employee mode
    if (this.editSelectedAllocationPercentage === null || this.editSelectedAllocationPercentage < 0 || this.editSelectedAllocationPercentage > 100) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please enter a valid allocation percentage (0-100)!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }


    // Validate billing percentage if in Billed mode
    if (this.editSelectedBilledStatus === 1 &&
      (this.editSelectedBillingPercentage === null ||
        this.editSelectedBillingPercentage <= 0)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please enter a valid billing percentage for Billed mode!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Validate dates
    if (this.editTentativeEndDate && new Date(this.editStartDate) > new Date(this.editTentativeEndDate)) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'End date must be after start date!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const updateData = {
      customer_id: this.editSelectedCustomerId,
      project_id: this.editSelectedProjectId,
      employee_id: this.editSelectedEmployeeId,
      project_role_id: this.editSelectedProjectRoleId,
      start_date: this.formatDate(this.editStartDate),
      end_date: this.editTentativeEndDate ? this.formatDate(this.editTentativeEndDate) : null,
      allocation_status: this.editSelectedAllocationStatus,
      allocation_percentage: Number(this.editSelectedAllocationPercentage), // Always send the selected percentage
      billed_status: this.editSelectedBilledStatus,
      billing_percentage: this.editSelectedBilledStatus === 0 ? 0 : Number(this.editSelectedBillingPercentage)
    };

    this.rmgService.updateAssignTeam(this.editProjectTeamId, updateData).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Assignment updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchAssignedProjectTeams();
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Update error:', error);
        let errorMessage = 'Failed to update assignment!';

        if (error.status === 400) {
          if (error.error?.error?.includes('Employee is already assigned')) {
            errorMessage = 'Employee is already assigned to this project!';
          }
          else if (error.error?.error?.includes('Only')) {
            errorMessage = error.error.error;
          }
        }

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: errorMessage,
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  openEditModal(team: any): void {
    console.log('Team Data:', team);

    this.editSelectedCustomerId = team.customer_id;
    this.editSelectedProjectId = team.project_id;
    this.editSelectedEmployeeId = team.employee_id;
    this.editSelectedProjectRoleId = team.project_role_id;
    this.editStartDate = this.formatDate(team.start_date);
    this.editTentativeEndDate = this.formatDate(team.end_date);
    this.editSelectedAllocationStatus = team.allocation_status;
    this.editSelectedAllocationPercentage = team.allocation_percentage;
    this.editSelectedBilledStatus = team.billed_status;
    this.editSelectedBillingPercentage = team.billing_percentage;
    this.editProjectTeamId = team.project_team_id;

    this.selectedCustomerId = team.customer_id;

    this.filterProjects();

    this.isEditModalOpen = true;
    console.log('Selected Project ID:', this.editSelectedProjectId);
    console.log('Filtered Projects:', this.filteredProjects);
  }

  // Close Edit Modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editSelectedCustomerId = null;
    this.editSelectedProjectId = null;
    this.editSelectedEmployeeId = null;
    this.editSelectedProjectRoleId = null;
    this.editStartDate = '';
    this.editTentativeEndDate = '';
    this.editSelectedAllocationStatus = 0;
    this.editSelectedAllocationPercentage = null;
    this.editSelectedBilledStatus = 0;
    this.editSelectedBillingPercentage = null;
    this.editProjectTeamId = null;
  }
  onEditAllocationStatusChange(status: number) {
    this.editSelectedAllocationStatus = status;

    if (status === 0) { // Shadow
      this.editSelectedAllocationPercentage = 0;
      this.editSelectedBilledStatus = 0;
      this.editSelectedBillingPercentage = 0;
    }
  }
 toggleEditAllocationStatus(): void {
  this.editSelectedAllocationStatus = this.editSelectedAllocationStatus === 1 ? 0 : 1;
  if (this.editSelectedAllocationStatus === 0) {
    this.editSelectedBilledStatus = 0;
    this.editSelectedBillingPercentage = 0;
}

  // No longer resetting allocation percentage here
}


  // Toggle Billed Status
  toggleEditBilledStatus(): void {
    // Can't toggle if in Shadow mode
    if (this.editSelectedAllocationStatus === 0) return;

    const newStatus = this.editSelectedBilledStatus === 1 ? 0 : 1;
    this.editSelectedBilledStatus = newStatus;

    // Reset billing percentage when toggling to Not Billed
    if (newStatus === 0) {
      this.editSelectedBillingPercentage = 0;
    } else {
      // When switching to Billed, set default billing if not set
      if (this.editSelectedBillingPercentage === null || this.editSelectedBillingPercentage === 0) {
        this.editSelectedBillingPercentage = this.percentageOptions[0] || 100;
      }
    }
  }



  assignedProjectTeams: any[] = []; 

  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5; 

  filteredAssignedProjectTeams: any[] = [];
  paginatedAssignedProjectTeams: any[] = [];

  // Filters
  customerNameFilter: string = '';
  projectNameFilter: string = '';
  employeeNameFilter: string = '';
  allocationStatusFilter: number | null = null;
  billedStatusFilter: number | null = null;

  // New filter properties
  projectRoleFilter: string = '';
  projectManagerFilter: string = '';
  startDateFilter: string = '';
  endDateFilter: string = '';
  allocationPercentageFilter: number | null = null;
  billingPercentageFilter: number | null = null;


  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return localDate.toISOString().split('T')[0];
  }

  applyFilters(): void {
    this.filteredAssignedProjectTeams = this.assignedProjectTeams.filter(team => {
      return (
        (this.customerNameFilter ? team.customer_id === this.customerNameFilter : true) &&
        (this.projectNameFilter ? team.project_id === this.projectNameFilter : true) &&
        (this.employeeNameFilter ? team.employee_id === this.employeeNameFilter : true) &&
        (this.projectRoleFilter ? team.project_role_id === this.projectRoleFilter : true) &&
        (this.projectManagerFilter ? team.project_manager_id === this.projectManagerFilter : true) &&
        (this.startDateFilter ? this.formatDate(team.start_date) == this.startDateFilter : true) &&
        (this.endDateFilter ? this.formatDate(team.end_date) == this.endDateFilter : true) &&
        (this.allocationStatusFilter !== null ? team.allocation_status === this.allocationStatusFilter : true) &&
        (this.allocationPercentageFilter !== null ? team.allocation_percentage === this.allocationPercentageFilter : true) &&
        (this.billedStatusFilter !== null ? team.billed_status === this.billedStatusFilter : true) &&
        (this.billingPercentageFilter !== null ? team.billing_percentage === this.billingPercentageFilter : true)
      );
    });

    this.totalItems = this.filteredAssignedProjectTeams.length;
    this.currentPage = 1;
    this.updatePage();
  }

  testNgSelect(event: any) {
    console.log('Selected Customer:', event);
  }

  // Clear Filters
  // Clear Filters
  clearFilters(): void {
    this.customerNameFilter = '';
    this.projectNameFilter = '';
    this.employeeNameFilter = '';
    this.projectRoleFilter = '';
    this.projectManagerFilter = '';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.allocationStatusFilter = null;
    this.allocationPercentageFilter = null;
    this.billedStatusFilter = null;
    this.billingPercentageFilter = null;
    this.applyFilters();
  }
  // Clear Individual Filter
  clearFilter(filterName: string): void {
    switch (filterName) {

      case 'startDateFilter':
        this.startDateFilter = '';
        break;
      case 'endDateFilter':
        this.endDateFilter = '';
        break;

      case 'allocationPercentageFilter':
        this.allocationPercentageFilter = null;
        break;

      case 'billingPercentageFilter':
        this.billingPercentageFilter = null;
        break;
    }
    this.applyFilters(); // Reapply filters after clearing
  }
  // Pagination Variables

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAssignedProjectTeams = this.filteredAssignedProjectTeams.slice(startIndex, endIndex);
  }

  // Change page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  // Compute total pages
  get totalPages(): number {
    return Math.ceil(this.filteredAssignedProjectTeams.length / this.itemsPerPage);
  }

  // Compute visible page numbers
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



}
