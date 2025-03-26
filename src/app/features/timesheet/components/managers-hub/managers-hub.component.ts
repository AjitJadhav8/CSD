import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';

@Component({
  selector: 'app-managers-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './managers-hub.component.html',
  styleUrl: './managers-hub.component.css'
})
export class ManagersHubComponent {

  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }
  

  selectedSection: string = 'projectPhases'; // Default section
  ngOnInit(): void {
    // Listen for storage events to detect section changes
     // Initialize with default or saved section
     this.selectedSection = localStorage.getItem('selectedManagersHubSection') || 'projectPhases';
     localStorage.setItem('selectedManagersHubSection', this.selectedSection);
 
     // Listen for changes (e.g., when clicking Project Deliverable)
     window.addEventListener('storage', this.updateSectionFromStorage.bind(this));

    this.fetchProjectDeliverables();
    this.fetchProjectPhases();
    this.fetchProjectTeamData();
    this.fetchProjectTeamsTimesheet();
    this.fetchReportingTeamData();
    this.fetchReportingTeamsTimesheet();
    this.fetchOptions();

    // this.dataService.getOptions().subscribe(
    //   (response) => {
    //     console.log('Roles, Departments, Users, and Customers:', response);
    //     this.optionUsers = response.users;
    //     this.optionCustomers = response.customers;
    //     this.optionTypeOfEngagement = response.typeOfEngagement;
    //     this.optionTypeOfProject = response.typeOfProject;
    //     this.optionProjectStatus = response.projectStatus;
    //     this.optionProject = response.projects;
    //     this.optionPhases = response.phases;
    //     this.optionProjectManagers = response.projectManagers;
    //     this.optionReportingManagers = response.reportingManagers;
    //     this.optionProjectRole = response.projectRole;
    //     this.filteredProjects = [];
    //   },
    //   (error) => {
    //     console.error('Error fetching data', error);
    //   }
    // );
  }

  fetchOptions() {
    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Roles, Departments, Users, and Customers:', response);
        this.optionUsers = response.users;
        this.optionCustomers = response.customers;
        this.optionTypeOfEngagement = response.typeOfEngagement;
        this.optionTypeOfProject = response.typeOfProject;
        this.optionProjectStatus = response.projectStatus;
        this.optionProject = response.projects;
        this.optionPhases = response.phases;
        this.optionProjectManagers = response.projectManagers;
        this.optionReportingManagers = response.reportingManagers;
        this.optionProjectRole = response.projectRole;
        this.filteredProjects = [];
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  

  
  ngOnDestroy() {
    window.removeEventListener('storage', this.updateSectionFromStorage.bind(this));
  }

  updateSectionFromStorage() {
    this.selectedSection = localStorage.getItem('selectedManagersHubSection') || 'projectPhases';
  }

  changeSection(section: string) {
    this.selectedSection = section;
    localStorage.setItem('selectedManagersHubSection', section);
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('storage'));
  }


    filterProjectsByCustomer(): void {
      const selectedCustomerId = Number(this.selectedCustomerId);
      if (selectedCustomerId) {
        this.filteredProjects = this.optionProject.filter(
          (project) => Number(project.customer_id) === selectedCustomerId
        );
      } else {
        this.filteredProjects = []; // Reset if no customer is selected
      }
      this.filteredProjects = [...this.filteredProjects]; // Trigger change detection
    }
    filterPhasesByProject(): void {
      const selectedProjectId = Number(this.selectedProjectId);
      if (selectedProjectId) {
        this.filteredPhases = this.optionPhases.filter(
          (phase) => Number(phase.project_id) === selectedProjectId
        );
      } else {
        this.filteredPhases = []; // Reset if no project is selected
      }
      this.filteredPhases = [...this.filteredPhases]; // Trigger change detection
    }

    filteredProjects: any[] = []; // Store filtered projects

    // Function to filter projects based on selected customer
  // Method to filter projects based on selected customer
  filterProjects(): void {
    const selectedCustomerId = Number(this.projectDeliverableForm.customer_id);
    
  
    if (selectedCustomerId) {
      this.filteredProjects = this.optionProject.filter(
        project => Number(project.customer_id) === selectedCustomerId
      );
    } else {
      this.filteredProjects = []; // No customer selected, show empty
    }
  
    console.log("Filtered Projects:", this.filteredProjects);
  }
   

    optionPhases: any[] = [];

    optionProject: any[] = [];
    optionTypeOfEngagement: any[] = [];
    optionTypeOfProject: any[] = [];
    optionProjectStatus: any[] = [];
    optionUsers: any[] = [];
    // optionDepartments:any;
    // optionRoles:any;
    optionCustomers: any[] = [];
    optionProjectManagers: any[] = [];
    optionReportingManagers: any[] = [];

optionProjectRole: any[] = [];




    deliverableCurrentPage: number = 1;
    deliverableTotalItems: number = 0;
    deliverableItemsPerPage: number = 30; // Adjust as needed
    deliverableMaxPageButtons: number = 5; // Show only 5 page numbers at a time
    filteredProjectDeliverables: any[] = [];
    paginatedProjectDeliverables: any[] = [];
    
    // Filters for Project Deliverables
    deliverableNameFilter: string = '';
    // customerNameFilter: string = '';
    // projectNameFilter: string = '';
    // phaseNameFiltered: string = ''; // New Filter

    deliverableCustomerFilter: string = '';
deliverableProjectFilter: string = '';
deliverablePhaseFilter: string = '';
  
  
    projectDeliverableForm: any = {
      phase_id: '',
      project_deliverable_name: '',
    };
    projectDeliverables: any[] = [];
    filteredPhases: any[] = [];
    selectedCustomerId: number | null = null;
    selectedProjectId: number | null = null; 
    
    projectDeliverable = {
      pd_id: null, // Primary key
      project_id: null, // Foreign key reference
      project_name: '',
      project_deliverable_name: '',
      planned_start_date: '', // Format as 'YYYY-MM-DD' if needed
      actual_start_date: '', // Format as 'YYYY-MM-DD' if needed
      tentative_end_date: '', // Format as 'YYYY-MM-DD' if needed
      deliverable_description: '',
      is_deleted: null, // For soft delete
      created_at: '', // Optional: Track creation date
      updated_at: '' // Optional: Track last update date
    }
  
    fetchProjectDeliverables(): void {
      this.dataService.getAllProjectDeliverables().subscribe(
        (response) => {
          this.projectDeliverables = response;
          this.filteredProjectDeliverables = [...this.projectDeliverables];
          this.deliverableTotalItems = this.filteredProjectDeliverables.length;
          this.updateDeliverablePage();
        },
        (error) => {
          console.error('Error fetching project deliverables:', error);
        }
      );
    }
  // Apply Filters for Project Deliverables
  applyDeliverableFilters(): void {
    this.filteredProjectDeliverables = this.projectDeliverables.filter(deliverable => {
        return (
            (!this.deliverableCustomerFilter || deliverable.customer_name === this.deliverableCustomerFilter) &&
            (!this.deliverableProjectFilter || deliverable.project_name === this.deliverableProjectFilter) &&
            (!this.deliverablePhaseFilter || deliverable.project_phase_name === this.deliverablePhaseFilter) &&
            (!this.deliverableNameFilter || 
                deliverable.project_deliverable_name.toLowerCase().includes(this.deliverableNameFilter.toLowerCase()))
        );
    });

    this.deliverableTotalItems = this.filteredProjectDeliverables.length;
    this.deliverableCurrentPage = 1;
    this.updateDeliverablePage();
}

  
  // Clear Filters for Project Deliverables
  
// Clear Filters for Project Deliverables
// Update clear method
clearDeliverableFilters(): void {
  this.deliverableCustomerFilter = '';
  this.deliverableProjectFilter = '';
  this.deliverablePhaseFilter = '';
  this.deliverableNameFilter = '';
  this.applyDeliverableFilters();
}

// Clear Individual Filter for Project Deliverables
// clearDeliverableFilter(filterName: string): void {
//   switch (filterName) {
//     case 'deliverableNameFilter':
//       this.deliverableNameFilter = '';
//       break;
//     case 'customerNameFilter':
//       this.customerNameFilter = '';
//       break;
//     case 'projectNameFilter':
//       this.projectNameFilter = '';
//       break;
//       case 'phaseNameFiltered': // New Case
//       this.phaseNameFiltered = '';
//       break;
//   }
//   this.applyDeliverableFilters(); // Reapply filters after clearing
// }


 
// Pagination Logic for Project Deliverables
updateDeliverablePage(): void {
  const startIndex = (this.deliverableCurrentPage - 1) * this.deliverableItemsPerPage;
  const endIndex = startIndex + this.deliverableItemsPerPage;
  this.paginatedProjectDeliverables = this.filteredProjectDeliverables.slice(startIndex, endIndex);
}

changeDeliverablePage(page: number): void {
  if (page >= 1 && page <= this.deliverableTotalPages) {
    this.deliverableCurrentPage = page;
    this.updateDeliverablePage();
  }
}

get deliverableTotalPages(): number {
  return Math.ceil(this.filteredProjectDeliverables.length / this.deliverableItemsPerPage);
}

getVisibleDeliverablePageNumbers(): number[] {
  const totalPages = this.deliverableTotalPages;
  const halfRange = Math.floor(this.deliverableMaxPageButtons / 2);

  let startPage = Math.max(1, this.deliverableCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.deliverableMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.deliverableMaxPageButtons) {
    startPage = Math.max(1, endPage - this.deliverableMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
} 
   
 submitProjectDeliverable(projectDeliverableFormRef: NgForm): void {
    if (projectDeliverableFormRef.invalid) return;
  
    this.dataService.addProjectDeliverable(this.projectDeliverableForm).subscribe(
      (response) => {
        console.log('Project deliverable added successfully:', response);
        this.fetchProjectDeliverables(); // Refresh the list
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project deliverable added successfully!',
          showConfirmButton: false,
          timer: 3000,
        });
        projectDeliverableFormRef.resetForm();
        this.fetchOptions();


          // Refresh both phases and deliverables
      this.fetchProjectPhases();
      this.fetchProjectDeliverables(); // Add this line
      },
      (error) => {
        console.error('Error adding project deliverable', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error adding project deliverable!',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }

     deleteProjectDeliverable(deliverableId: number): void {
        Swal.fire({
          title: 'Are you sure?',
          text: 'This project deliverable will be deleted!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.dataService.deleteProjectDeliverable(deliverableId).subscribe(
              (response) => {
                console.log('Project deliverable deleted successfully:', response);
                this.fetchProjectDeliverables(); // Refresh the list
    
                // Success Toast Notification
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'success',
                  title: 'Project deliverable deleted successfully!',
                  showConfirmButton: false,
                  timer: 3000
                });
    
              },
              (error) => {
                console.error('Error deleting project deliverable:', error);
    
                // Error Toast Notification
                Swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'error',
                  title: 'Error deleting project deliverable!',
                  showConfirmButton: false,
                  timer: 3000
                });
              }
            );
          }
        });
      }
  

      // ----------------- Project Phasese -----------------------
  

      
      // For Project Phases
      filterProjectsForPhases(): void {
        const selectedCustomerId = Number(this.projectPhaseForm.customer_id);
        if (selectedCustomerId) {
          this.filteredProjects = this.optionProject.filter(project => Number(project.customer_id) === selectedCustomerId);
        } else {
          this.filteredProjects = [];
        }
        this.filteredProjects = [...this.filteredProjects]; // Trigger change detection
      }
        // Pagination and Filtering Variables
        phaseCurrentPage: number = 1;
        phaseTotalItems: number = 0;
        phaseItemsPerPage: number = 30;
        phaseMaxPageButtons: number = 5;
        filteredProjectPhases: any[] = [];
        paginatedProjectPhases: any[] = [];
      
        // Filters for Project Phases
        phaseNameFilter: string = '';
        phaseCustomerFilter: string = '';
phaseProjectFilter: string = '';
      
        // Form Model
        projectPhaseForm: any = {
          customer_id: '',
          project_id: '',
          project_phase_name: ''
        };
      
        // Data Storage
        projectPhases: any[] = [];
      
        fetchProjectPhases(): void {
          this.dataService.getAllProjectPhases().subscribe(
            (response) => {
              this.projectPhases = response;
              this.filteredProjectPhases = [...this.projectPhases];
              this.phaseTotalItems = this.filteredProjectPhases.length;
              this.updatePhasePage();
            },
            (error) => {
              console.error('Error fetching project phases:', error);
            }
          );
        }
      
        submitProjectPhase(projectPhaseFormRef: NgForm): void {
          if (projectPhaseFormRef.invalid) return;
      
          this.dataService.addProjectPhase(this.projectPhaseForm).subscribe(
            (response) => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Project phase added successfully!',
                showConfirmButton: false,
                timer: 3000
              });
              this.fetchProjectPhases();
              projectPhaseFormRef.resetForm();
              this.fetchOptions();

            },
            (error) => {
              Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Error adding project phase!',
                showConfirmButton: false,
                timer: 3000
              });
            }
          );
        }
      
        deleteProjectPhase(phaseId: number): void {
          Swal.fire({
            title: 'Are you sure?',
            text: 'This project phase will be deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.dataService.deleteProjectPhase(phaseId).subscribe(
                (response) => {
                  Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Project phase deleted successfully!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                  this.fetchProjectPhases();
                },
                (error) => {
                  Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error deleting project phase!',
                    showConfirmButton: false,
                    timer: 3000
                  });
                }
              );
            }
          });
        }
      
        // Update the filter method
applyPhaseFilters(): void {
    this.filteredProjectPhases = this.projectPhases.filter(phase => {
        return (
            (!this.phaseCustomerFilter || phase.customer_name === this.phaseCustomerFilter) &&
            (!this.phaseProjectFilter || phase.project_name === this.phaseProjectFilter) &&
            (!this.phaseNameFilter || 
                phase.project_phase_name.toLowerCase().includes(this.phaseNameFilter.toLowerCase()))
        );
    });

    this.phaseTotalItems = this.filteredProjectPhases.length;
    this.phaseCurrentPage = 1;
    this.updatePhasePage();
}
      
        // Update clear method
clearPhaseFilters(): void {
  this.phaseCustomerFilter = '';
  this.phaseProjectFilter = '';
  this.phaseNameFilter = '';
  this.applyPhaseFilters();
}
      
        
      
        updatePhasePage(): void {
          const startIndex = (this.phaseCurrentPage - 1) * this.phaseItemsPerPage;
          const endIndex = startIndex + this.phaseItemsPerPage;
          this.paginatedProjectPhases = this.filteredProjectPhases.slice(startIndex, endIndex);
        }
      
        changePhasePage(page: number): void {
          if (page >= 1 && page <= this.phaseTotalPages) {
            this.phaseCurrentPage = page;
            this.updatePhasePage();
          }
        }
      
        get phaseTotalPages(): number {
          return Math.ceil(this.filteredProjectPhases.length / this.phaseItemsPerPage);
        }
      
        getVisiblePhasePageNumbers(): number[] {
          const totalPages = this.phaseTotalPages;
          const halfRange = Math.floor(this.phaseMaxPageButtons / 2);
      
          let startPage = Math.max(1, this.phaseCurrentPage - halfRange);
          let endPage = Math.min(totalPages, startPage + this.phaseMaxPageButtons - 1);
      
          if (endPage - startPage + 1 < this.phaseMaxPageButtons) {
            startPage = Math.max(1, endPage - this.phaseMaxPageButtons + 1);
          }
      
          return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
        }
      

    // ----------------------- Managers Hub ---------------------------

               // For View My Project Team section
  projectTeamData: any[] = [];
  filteredProjectTeamData: any[] = [];
  displayedProjectTeamData: any[] = [];
  
  // Pagination
  teamCustomerFilter: string = '';
teamProjectFilter: string = '';
teamEmployeeFilter: string = '';
teamCurrentPage: number = 1;
teamItemsPerPage: number = 30;
teamMaxPageButtons: number = 5;
paginatedProjectTeamData: any[] = [];

teamManagerFilter: string = '';
teamRoleFilter: string = '';
teamAllocationStatusFilter: string = '';
teamBilledStatusFilter: string = '';
teamStartDateFrom: string = '';
teamStartDateTo: string = '';

   // Project Team Methods
   // Update the fetch method
fetchProjectTeamData(): void {
  const projectManagerId = Number(localStorage.getItem('user_id'));
  if (!projectManagerId) {
      console.error('User ID not found in local storage.');
      return;
  }

  this.timesheetService.getProjectTeamByManager(projectManagerId).subscribe(
      (response) => {
          this.projectTeamData = response;
          this.filteredProjectTeamData = [...this.projectTeamData];
          this.updateTeamPage();
      },
      (error) => {
          console.error('Error fetching project team data:', error);
      }
  );
}
// Add these methods
// Enhance the applyTeamFilters method
applyTeamFilters(): void {
  this.filteredProjectTeamData = this.projectTeamData.filter(member => {
      const matchesCustomer = !this.teamCustomerFilter || 
          member.customer_name === this.teamCustomerFilter;
      
      const matchesProject = !this.teamProjectFilter || 
          member.project_name === this.teamProjectFilter;
      
      const matchesManager = !this.teamManagerFilter || 
          member.project_manager_name === this.teamManagerFilter;
      
      const matchesEmployee = !this.teamEmployeeFilter || 
          member.employee_name === this.teamEmployeeFilter;
      
      const matchesRole = !this.teamRoleFilter || 
          member.project_role_name === this.teamRoleFilter;
      
      const matchesAllocationStatus = !this.teamAllocationStatusFilter || 
          member.allocation_status.toString() === this.teamAllocationStatusFilter;
      
      const matchesBilledStatus = !this.teamBilledStatusFilter || 
          member.billed_status.toString() === this.teamBilledStatusFilter;
      
      // Date filtering
      let matchesStartDate = true;
      if (this.teamStartDateFrom || this.teamStartDateTo) {
          const startDate = new Date(member.start_date);
          const fromDate = this.teamStartDateFrom ? new Date(this.teamStartDateFrom) : null;
          const toDate = this.teamStartDateTo ? new Date(this.teamStartDateTo) : null;
          
          if (fromDate && startDate < fromDate) matchesStartDate = false;
          if (toDate && startDate > toDate) matchesStartDate = false;
      }

      return matchesCustomer && matchesProject && matchesManager && 
             matchesEmployee && matchesRole && matchesAllocationStatus && 
             matchesBilledStatus && matchesStartDate;
  });

  this.teamCurrentPage = 1;
  this.updateTeamPage();
}

clearTeamFilters(): void {
  this.teamCustomerFilter = '';
  this.teamProjectFilter = '';
  this.teamManagerFilter = '';
  this.teamEmployeeFilter = '';
  this.teamRoleFilter = '';
  this.teamAllocationStatusFilter = '';
  this.teamBilledStatusFilter = '';
  this.teamStartDateFrom = '';
  this.teamStartDateTo = '';
  this.applyTeamFilters();
}

clearTeamFilter(filterName: string): void {
  switch (filterName) {
      case 'teamCustomerFilter':
          this.teamCustomerFilter = '';
          break;
      case 'teamProjectFilter':
          this.teamProjectFilter = '';
          break;
      case 'teamEmployeeFilter':
          this.teamEmployeeFilter = '';
          break;
  }
  this.applyTeamFilters();
}
updateTeamPage(): void {
  const startIndex = (this.teamCurrentPage - 1) * this.teamItemsPerPage;
  const endIndex = startIndex + this.teamItemsPerPage;
  this.paginatedProjectTeamData = this.filteredProjectTeamData.slice(startIndex, endIndex);
}

changeTeamPage(page: number): void {
  if (page >= 1 && page <= this.teamTotalPages) {
      this.teamCurrentPage = page;
      this.updateTeamPage();
  }
}

get teamTotalPages(): number {
  return Math.ceil(this.filteredProjectTeamData.length / this.teamItemsPerPage);
}

getVisibleTeamPageNumbers(): number[] {
  const totalPages = this.teamTotalPages;
  const halfRange = Math.floor(this.teamMaxPageButtons / 2);

  let startPage = Math.max(1, this.teamCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.teamMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.teamMaxPageButtons) {
      startPage = Math.max(1, endPage - this.teamMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}



               // For View My Project Teams Timesheet

               timesheetData: any[] = [];
               filteredTimesheetData: any[] = [];
               paginatedTimesheetData: any[] = [];
               timesheetCurrentPage: number = 1;
               timesheetItemsPerPage: number = 30;
               timesheetMaxPageButtons: number = 5;
               
               // Filters
               timesheetEmployeeFilter: string = '';
               timesheetProjectFilter: string = '';
               timesheetPhaseFilter: string = '';
               timesheetDateFrom: string = '';
               timesheetDateTo: string = '';
               timesheetStatusFilter: string = '';
               
               // Options
               optionTeamMembers: any[] = [];
               optionProjectsForTimesheet: any[] = [];
               optionPhasesForTimesheet: any[] = [];
// Add these methods
fetchProjectTeamsTimesheet(): void {
  const projectManagerId = Number(localStorage.getItem('user_id'));
  if (!projectManagerId) return;

  this.timesheetService.getProjectTeamsTimesheet(projectManagerId).subscribe(
    (response) => {
      this.timesheetData = response;
      
      // Process all filter options
      this.optionTeamMembers = this.getUniqueTeamMembers(this.timesheetData);
      this.optionProjectsForTimesheet = this.getUniqueSimpleItems(
        this.timesheetData,
        'project_name',
        'project_id'
      );
      this.optionPhasesForTimesheet = this.getUniqueSimpleItems(
        this.timesheetData,
        'project_phase_name',
        'phase_id'
      );
      
      console.log('Processed options:', {
        teamMembers: this.optionTeamMembers,
        projects: this.optionProjectsForTimesheet,
        phases: this.optionPhasesForTimesheet
      });
      
      this.filteredTimesheetData = [...this.timesheetData];
      this.updateTimesheetPage();
    },
    (error) => console.error(error)
  );
}
// For team members (needs name handling)
private getUniqueTeamMembers(data: any[]): any[] {
  const uniqueMap = new Map();
  
  data.forEach(item => {
    if (item.user_id && item.employee_name) {
      if (!uniqueMap.has(item.user_id)) {
        uniqueMap.set(item.user_id, {
          id: item.user_id,
          fullName: item.employee_name
        });
      }
    } else {
      console.warn('Missing required fields in item:', item);
    }
  });
  
  return Array.from(uniqueMap.values());
}

private getUniqueSimpleItems(
  data: any[],
  displayField: string,
  idField: string
): any[] {
  const uniqueMap = new Map();
  data.forEach(item => {
    if (item[idField] && item[displayField] && !uniqueMap.has(item[idField])) {
      uniqueMap.set(item[idField], {
        id: item[idField],
        name: item[displayField]
      });
    }
  });
  return Array.from(uniqueMap.values());
}

applyTimesheetFilters(): void {
  this.filteredTimesheetData = this.timesheetData.filter(timesheet => {
      // Employee filter - compare by ID
      const matchesEmployee = !this.timesheetEmployeeFilter || 
      timesheet.user_id == this.timesheetEmployeeFilter;

      const matchesProject = !this.timesheetProjectFilter || 
                         timesheet.project_id == this.timesheetProjectFilter;
    
    // Phase filter - compare by ID
    const matchesPhase = !this.timesheetPhaseFilter || 
                       timesheet.phase_id == this.timesheetPhaseFilter;

      
      const matchesStatus = !this.timesheetStatusFilter || 
          timesheet.task_status.toString() === this.timesheetStatusFilter;
      
      // Date filtering
      let matchesDate = true;
      if (this.timesheetDateFrom || this.timesheetDateTo) {
          const timesheetDate = new Date(timesheet.timesheet_date);
          const fromDate = this.timesheetDateFrom ? new Date(this.timesheetDateFrom) : null;
          const toDate = this.timesheetDateTo ? new Date(this.timesheetDateTo) : null;
          
          if (fromDate && timesheetDate < fromDate) matchesDate = false;
          if (toDate && timesheetDate > toDate) matchesDate = false;
      }

      return matchesEmployee && matchesProject && matchesPhase && 
             matchesStatus && matchesDate;
  });

  this.timesheetCurrentPage = 1;
  this.updateTimesheetPage();
}

clearTimesheetFilters(): void {
  this.timesheetEmployeeFilter = '';
  this.timesheetProjectFilter = '';
  this.timesheetPhaseFilter = '';
  this.timesheetDateFrom = '';
  this.timesheetDateTo = '';
  this.timesheetStatusFilter = '';
  this.applyTimesheetFilters();
}

updateTimesheetPage(): void {
  const startIndex = (this.timesheetCurrentPage - 1) * this.timesheetItemsPerPage;
  const endIndex = startIndex + this.timesheetItemsPerPage;
  this.paginatedTimesheetData = this.filteredTimesheetData.slice(startIndex, endIndex);
}

changeTimesheetPage(page: number): void {
  if (page >= 1 && page <= this.timesheetTotalPages) {
      this.timesheetCurrentPage = page;
      this.updateTimesheetPage();
  }
}

get timesheetTotalPages(): number {
  return Math.ceil(this.filteredTimesheetData.length / this.timesheetItemsPerPage);
}

getVisibleTimesheetPageNumbers(): number[] {
  const totalPages = this.timesheetTotalPages;
  const halfRange = Math.floor(this.timesheetMaxPageButtons / 2);

  let startPage = Math.max(1, this.timesheetCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.timesheetMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.timesheetMaxPageButtons) {
      startPage = Math.max(1, endPage - this.timesheetMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}
             
//reporting manager 


// For View My Reporting Team section
reportingTeamData: any[] = [];
filteredReportingTeamData: any[] = [];
paginatedReportingTeamData: any[] = [];

// Pagination and Filters
reportingCustomerFilter: string = '';
reportingProjectFilter: string = '';
reportingManagerFilter: string = '';
reportingEmployeeFilter: string = '';
reportingRoleFilter: string = '';
reportingAllocationStatusFilter: string = '';
reportingBilledStatusFilter: string = '';
reportingStartDateFrom: string = '';
reportingStartDateTo: string = '';
reportingCurrentPage: number = 1;
reportingItemsPerPage: number = 30;
reportingMaxPageButtons: number = 5;

// Fetch reporting team data
fetchReportingTeamData(): void {
  const reportingManagerId = Number(localStorage.getItem('user_id'));
  if (!reportingManagerId) {
      console.error('User ID not found in local storage.');
      return;
  }

  this.timesheetService.getReportingTeamByManager(reportingManagerId).subscribe(
      (response) => {
        console.log('rm fetch data', response);
          this.reportingTeamData = response;
          this.filteredReportingTeamData = [...this.reportingTeamData];
          this.updateReportingPage();
      },
      (error) => {
          console.error('Error fetching reporting team data:', error);
      }
  );
}

// Filter methods
applyReportingFilters(): void {
  this.filteredReportingTeamData = this.reportingTeamData.filter(member => {
      const matchesCustomer = !this.reportingCustomerFilter || 
          member.customer_name === this.reportingCustomerFilter;
      
      const matchesProject = !this.reportingProjectFilter || 
          member.project_name === this.reportingProjectFilter;
      
      const matchesManager = !this.reportingManagerFilter || 
          member.reporting_manager_name === this.reportingManagerFilter;
      
      const matchesEmployee = !this.reportingEmployeeFilter || 
          member.employee_name === this.reportingEmployeeFilter;
      
      const matchesRole = !this.reportingRoleFilter || 
          member.project_role_name === this.reportingRoleFilter;
      
      // Updated allocation status filter to handle number values
      const matchesAllocationStatus = !this.reportingAllocationStatusFilter || 
          (this.reportingAllocationStatusFilter === 'true' ? member.allocation_status === 1 : member.allocation_status === 0);
      
      // Updated billed status filter to handle number values
      const matchesBilledStatus = !this.reportingBilledStatusFilter || 
          (this.reportingBilledStatusFilter === 'true' ? member.billed_status === 1 : member.billed_status === 0);
      
      // Date filtering
      let matchesStartDate = true;
      if (this.reportingStartDateFrom || this.reportingStartDateTo) {
          const startDate = new Date(member.start_date);
          const fromDate = this.reportingStartDateFrom ? new Date(this.reportingStartDateFrom) : null;
          const toDate = this.reportingStartDateTo ? new Date(this.reportingStartDateTo) : null;
          
          if (fromDate && startDate < fromDate) matchesStartDate = false;
          if (toDate && startDate > toDate) matchesStartDate = false;
      }

      return matchesCustomer && matchesProject && matchesManager && 
             matchesEmployee && matchesRole && matchesAllocationStatus && 
             matchesBilledStatus && matchesStartDate;
  });

  this.reportingCurrentPage = 1;
  this.updateReportingPage();
}

clearReportingFilters(): void {
  this.reportingCustomerFilter = '';
  this.reportingProjectFilter = '';
  this.reportingManagerFilter = '';
  this.reportingEmployeeFilter = '';
  this.reportingRoleFilter = '';
  this.reportingAllocationStatusFilter = '';
  this.reportingBilledStatusFilter = '';
  this.reportingStartDateFrom = '';
  this.reportingStartDateTo = '';
  this.applyReportingFilters();
}

// Pagination methods
updateReportingPage(): void {
  const startIndex = (this.reportingCurrentPage - 1) * this.reportingItemsPerPage;
  const endIndex = startIndex + this.reportingItemsPerPage;
  this.paginatedReportingTeamData = this.filteredReportingTeamData.slice(startIndex, endIndex);
}

changeReportingPage(page: number): void {
  if (page >= 1 && page <= this.reportingTotalPages) {
      this.reportingCurrentPage = page;
      this.updateReportingPage();
  }
}

get reportingTotalPages(): number {
  return Math.ceil(this.filteredReportingTeamData.length / this.reportingItemsPerPage);
}

getVisibleReportingPageNumbers(): number[] {
  const totalPages = this.reportingTotalPages;
  const halfRange = Math.floor(this.reportingMaxPageButtons / 2);

  let startPage = Math.max(1, this.reportingCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.reportingMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.reportingMaxPageButtons) {
      startPage = Math.max(1, endPage - this.reportingMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}


//Rm team 

// Add these properties to your component class
reportingTimesheetData: any[] = [];
filteredReportingTimesheetData: any[] = [];
paginatedReportingTimesheetData: any[] = [];

// Filters
reportingTimesheetEmployeeFilter: string = '';
reportingTimesheetProjectFilter: string = '';
reportingTimesheetPhaseFilter: string = '';
reportingTimesheetDateFrom: string = '';
reportingTimesheetDateTo: string = '';
reportingTimesheetStatusFilter: string = '';

// Pagination
reportingTimesheetCurrentPage: number = 1;
reportingTimesheetItemsPerPage: number = 30;
reportingTimesheetMaxPageButtons: number = 5;

// Dropdown options
optionReportingTeamMembers: any[] = [];
optionReportingProjects: any[] = [];
optionReportingPhases: any[] = [];

// Fetch reporting team timesheets
fetchReportingTeamsTimesheet(): void {
  const reportingManagerId = Number(localStorage.getItem('user_id'));
  if (!reportingManagerId) {
    console.error('User ID not found in local storage.');
    return;
  }

  this.timesheetService.getReportingTeamsTimesheet(reportingManagerId).subscribe(
    (response) => {
      this.reportingTimesheetData = response;
      this.filteredReportingTimesheetData = [...this.reportingTimesheetData];
      this.updateReportingTimesheetPage();
      this.extractDropdownOptions();
    },
    (error) => {
      console.error('Error fetching reporting team timesheets:', error);
    }
  );
}


// Extract dropdown options from data
extractDropdownOptions(): void {
  // Employees
  this.optionReportingTeamMembers = Array.from(
    new Set(this.reportingTimesheetData.map(t => JSON.stringify({
      id: t.user_id,
      fullName: t.employee_name
    })))
  ).map(item => JSON.parse(item))
   .filter((item: {id: number, fullName: string}) => item.id && item.fullName);

  // Projects
  this.optionReportingProjects = Array.from(
    new Set(this.reportingTimesheetData.map(t => JSON.stringify({
      id: t.project_id,
      name: t.project_name
    })))
  ).map(item => JSON.parse(item))
   .filter((item: {id: number, name: string}) => item.id && item.name);

  // Phases
  this.optionReportingPhases = Array.from(
    new Set(this.reportingTimesheetData.map(t => JSON.stringify({
      id: t.phase_id,
      name: t.project_phase_name
    })))
  ).map(item => JSON.parse(item))
   .filter((item: {id: number, name: string}) => item.id && item.name);
}



// Filter methods
applyReportingTimesheetFilters(): void {
  this.filteredReportingTimesheetData = this.reportingTimesheetData.filter(timesheet => {
      const matchesEmployee = !this.reportingTimesheetEmployeeFilter || 
          timesheet.user_id.toString() === this.reportingTimesheetEmployeeFilter;
      
      const matchesProject = !this.reportingTimesheetProjectFilter || 
          timesheet.project_id.toString() === this.reportingTimesheetProjectFilter;
      
      const matchesPhase = !this.reportingTimesheetPhaseFilter || 
          timesheet.phase_id.toString() === this.reportingTimesheetPhaseFilter;
      
      const matchesStatus = !this.reportingTimesheetStatusFilter || 
          timesheet.task_status.toString() === this.reportingTimesheetStatusFilter;
      
      // Date filtering
      let matchesDate = true;
      if (this.reportingTimesheetDateFrom || this.reportingTimesheetDateTo) {
          const timesheetDate = new Date(timesheet.timesheet_date);
          const fromDate = this.reportingTimesheetDateFrom ? new Date(this.reportingTimesheetDateFrom) : null;
          const toDate = this.reportingTimesheetDateTo ? new Date(this.reportingTimesheetDateTo) : null;
          
          if (fromDate && timesheetDate < fromDate) matchesDate = false;
          if (toDate && timesheetDate > toDate) matchesDate = false;
      }

      return matchesEmployee && matchesProject && matchesPhase && 
             matchesStatus && matchesDate;
  });

  this.reportingTimesheetCurrentPage = 1;
  this.updateReportingTimesheetPage();
}

clearReportingTimesheetFilters(): void {
  this.reportingTimesheetEmployeeFilter = '';
  this.reportingTimesheetProjectFilter = '';
  this.reportingTimesheetPhaseFilter = '';
  this.reportingTimesheetDateFrom = '';
  this.reportingTimesheetDateTo = '';
  this.reportingTimesheetStatusFilter = '';
  this.applyReportingTimesheetFilters();
}

// Pagination methods
updateReportingTimesheetPage(): void {
  const startIndex = (this.reportingTimesheetCurrentPage - 1) * this.reportingTimesheetItemsPerPage;
  const endIndex = startIndex + this.reportingTimesheetItemsPerPage;
  this.paginatedReportingTimesheetData = this.filteredReportingTimesheetData.slice(startIndex, endIndex);
}

changeReportingTimesheetPage(page: number): void {
  if (page >= 1 && page <= this.reportingTimesheetTotalPages) {
      this.reportingTimesheetCurrentPage = page;
      this.updateReportingTimesheetPage();
  }
}

get reportingTimesheetTotalPages(): number {
  return Math.ceil(this.filteredReportingTimesheetData.length / this.reportingTimesheetItemsPerPage);
}

getVisibleReportingTimesheetPageNumbers(): number[] {
  const totalPages = this.reportingTimesheetTotalPages;
  const halfRange = Math.floor(this.reportingTimesheetMaxPageButtons / 2);

  let startPage = Math.max(1, this.reportingTimesheetCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.reportingTimesheetMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.reportingTimesheetMaxPageButtons) {
      startPage = Math.max(1, endPage - this.reportingTimesheetMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}





}
