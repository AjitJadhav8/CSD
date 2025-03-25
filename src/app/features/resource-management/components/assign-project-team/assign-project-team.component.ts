import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RmgService } from '../../../../services/rmg-service/rmg.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-project-team',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
        this.optionProjectManagers = response.users;
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
  selectedBillingPercentage: number = 0; // Default to 0%
  percentageOptions = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // 0 to 100 in steps of 10
  selectedCustomerId: number | null = null;


  onAllocationStatusChange() {
    if (this.selectedAllocationStatus === 0) { // If Shadow is selected
        this.selectedBilledStatus = 0; // Set to Not Billed
        this.selectedBillingPercentage = 0; // Set Billing Percentage to 0
    }
}


selectedAllocationStatus: number = 0; // Default to Shadow (0)


toggleAllocationStatus() {
  this.selectedAllocationStatus = this.selectedAllocationStatus === 1 ? 0 : 1;
  // If switching to Shadow, auto-set billing to 0% and Not Billed
  if (this.selectedAllocationStatus === 0) {
    this.selectedBilledStatus = 0;
    this.selectedBillingPercentage = 0;
  }
}

selectedBilledStatus: number = 0; // Default to Not Billed (0)

toggleBilledStatus() {
  this.selectedBilledStatus = this.selectedBilledStatus === 1 ? 0 : 1;
}


  selectedProjectId: number | null = null;
  selectedEmployeeId: number | null = null;
  selectedProjectRoleId: number | null = null;
  selectedProjectManagerId: number | null = null;
  selectedAllocationPercentage: number = 0; // Default to 0%
  startDate: string | null = null;
  tentativeEndDate: string | null = null;
    //submit assign project team
    submitAssignProjectTeam() {
      if (!this.selectedCustomerId || !this.selectedProjectId || !this.selectedEmployeeId || !this.selectedProjectRoleId ||
        this.selectedAllocationStatus === null || this.selectedAllocationStatus === undefined || // Updated check
        this.selectedAllocationPercentage === undefined || 
        this.selectedBilledStatus === null || this.selectedBilledStatus === undefined || // Updated check
        this.selectedBillingPercentage === null) {
          
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
  
      const assignmentData = {
          customer_id: this.selectedCustomerId,
          project_id: this.selectedProjectId,
          employee_id: this.selectedEmployeeId,
          project_role_id: this.selectedProjectRoleId,
          project_manager_id: this.selectedProjectManagerId,
          start_date: this.startDate,
          end_date: this.tentativeEndDate || null,
          allocation_status: this.selectedAllocationStatus,
          allocation_percentage: Number(this.selectedAllocationPercentage),
          billed_status: this.selectedBilledStatus,
          billing_percentage: Number(this.selectedBillingPercentage)
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
  
              this.fetchAssignedProjectTeams(); // Refresh the list
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
                } else if (errorMessage.includes('Only')) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: errorMessage, // Shows "Only X% allocation is remaining"
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else if (errorMessage.includes('start_date must be before or equal to end_date')) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Start date must be before or equal to end date!',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else if (errorMessage.includes('allocation_percentage must be a number between 0 and 100')) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Allocation percentage must be between 0 and 100!',
                        showConfirmButton: false,
                        timer: 3000
                    });
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

onProjectChange(event: Event) {
  const projectId = (event.target as HTMLSelectElement).value;
  if (projectId) {
    const selectedProject = this.optionProjects.find(project => project.project_id === +projectId);
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

updateAssignTeam(form: NgForm): void {
  if (form.invalid || !this.editProjectTeamId) {
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

  const updateData = {
    customer_id: this.editSelectedCustomerId,
    project_id: this.editSelectedProjectId,
    employee_id: this.editSelectedEmployeeId,
    project_role_id: this.editSelectedProjectRoleId,
    start_date: this.formatDate(this.editStartDate),
  end_date: this.formatDate(this.editTentativeEndDate) || null,
    allocation_status: this.editSelectedAllocationStatus,
    allocation_percentage: Number(this.editSelectedAllocationPercentage),
    billed_status: this.editSelectedBilledStatus,
    billing_percentage: Number(this.editSelectedBillingPercentage)
  };

  this.rmgService.updateAssignTeam(this.editProjectTeamId, updateData).subscribe({
    next: (response) => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Assign Team updated successfully!',
        showConfirmButton: false,
        timer: 3000
      });

      this.fetchAssignedProjectTeams(); // Refresh the list
      this.closeEditModal();
    },
    error: (error) => {
      console.error('Error updating assign team:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Failed to update assign team!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  });
}


// Open Edit Modal
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

// Toggle Allocation Status
toggleEditAllocationStatus(): void {
  this.editSelectedAllocationStatus = this.editSelectedAllocationStatus === 1 ? 0 : 1;
}

// Toggle Billed Status
toggleEditBilledStatus(): void {
  this.editSelectedBilledStatus = this.editSelectedBilledStatus === 1 ? 0 : 1;
}

// Update Assign Team






















// Clear Form Fields


  assignedProjectTeams: any[] = []; // <-- Declare this property

   // Pagination and Filtering
   currentPage: number = 1;
   totalItems: number = 0;
   itemsPerPage: number = 30;
 maxPageButtons: number = 5; // Show only 5 page numbers at a time
 
   filteredAssignedProjectTeams: any[] = [];
   paginatedAssignedProjectTeams: any[] = [];
 
   // Filters
   customerNameFilter: string = '';
   projectNameFilter: string = '';
   employeeNameFilter: string = '';
   allocationStatusFilter: string = '';
   billedStatusFilter: string = '';
 
  // New filter properties
  projectRoleFilter: string = '';
  projectManagerFilter: string = '';
  startDateFilter: string = '';
  endDateFilter: string = '';
  allocationPercentageFilter: number | null = null;
  billingPercentageFilter: number | null = null;
   // ✅ Fetch Assigned Project Teams
   

/** Convert date to 'YYYY-MM-DD' format */
formatDate(date: any): string {
  if (!date) return ''; // Handle empty dates
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Extract YYYY-MM-DD
}
 // Apply Filters
 // Apply Filters
 applyFilters(): void {
  this.filteredAssignedProjectTeams = this.assignedProjectTeams.filter(team => {
    return (
      (this.customerNameFilter ? team.customer_id.toString() === this.customerNameFilter : true) &&
      (this.projectNameFilter ? team.project_id.toString() === this.projectNameFilter : true) &&
      (this.employeeNameFilter ? team.employee_id.toString() === this.employeeNameFilter : true) &&
      (this.projectRoleFilter ? team.project_role_id.toString() === this.projectRoleFilter : true) &&
      (this.projectManagerFilter ? team.project_manager_id.toString() === this.projectManagerFilter : true) &&
      (this.startDateFilter ? this.formatDate(team.start_date) == this.startDateFilter : true) &&
      (this.endDateFilter ? this.formatDate(team.end_date) == this.endDateFilter : true) &&
      (this.allocationStatusFilter ? team.allocation_status.toString() === this.allocationStatusFilter : true) &&
      (this.allocationPercentageFilter !== null ? team.allocation_percentage === this.allocationPercentageFilter : true) &&
      (this.billedStatusFilter ? team.billed_status.toString() === this.billedStatusFilter : true) &&
      (this.billingPercentageFilter !== null ? team.billing_percentage === this.billingPercentageFilter : true)
    );
  });

  this.totalItems = this.filteredAssignedProjectTeams.length;
  this.currentPage = 1;
  this.updatePage();
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
  this.allocationStatusFilter = '';
  this.allocationPercentageFilter = null;
  this.billedStatusFilter = '';
  this.billingPercentageFilter = null;
  this.applyFilters();
}
// Clear Individual Filter
clearFilter(filterName: string): void {
  switch (filterName) {
    case 'customerNameFilter':
      this.customerNameFilter = '';
      break;
    case 'projectNameFilter':
      this.projectNameFilter = '';
      break;
    case 'employeeNameFilter':
      this.employeeNameFilter = '';
      break;
    case 'projectRoleFilter':
      this.projectRoleFilter = '';
      break;
    case 'projectManagerFilter':
      this.projectManagerFilter = '';
      break;
    case 'startDateFilter':
      this.startDateFilter = '';
      break;
    case 'endDateFilter':
      this.endDateFilter = '';
      break;
    case 'allocationStatusFilter':
      this.allocationStatusFilter = '';
      break;
    case 'allocationPercentageFilter':
      this.allocationPercentageFilter = null;
      break;
    case 'billedStatusFilter':
      this.billedStatusFilter = '';
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
