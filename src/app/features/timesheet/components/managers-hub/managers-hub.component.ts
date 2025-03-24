import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managers-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './managers-hub.component.html',
  styleUrl: './managers-hub.component.css'
})
export class ManagersHubComponent {

  constructor(private dataService: DataService, private http: HttpClient) { }
  

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
    deliverableCurrentPage: number = 1;
    deliverableTotalItems: number = 0;
    deliverableItemsPerPage: number = 30; // Adjust as needed
    deliverableMaxPageButtons: number = 5; // Show only 5 page numbers at a time
    filteredProjectDeliverables: any[] = [];
    paginatedProjectDeliverables: any[] = [];
    
    // Filters for Project Deliverables
    deliverableNameFilter: string = '';
    customerNameFilter: string = '';
    projectNameFilter: string = '';
    phaseNameFiltered: string = ''; // New Filter
  
  
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
        (this.deliverableNameFilter ? deliverable.project_deliverable_name.toLowerCase().includes(this.deliverableNameFilter.toLowerCase()) : true) &&
        (this.customerNameFilter ? deliverable.customer_name.toLowerCase().includes(this.customerNameFilter.toLowerCase()) : true) &&
        (this.projectNameFilter ? deliverable.project_name.toLowerCase().includes(this.projectNameFilter.toLowerCase()) : true) &&
        (this.phaseNameFiltered ? deliverable.project_phase_name.toLowerCase().includes(this.phaseNameFiltered.toLowerCase()) : true) // New Filter
      
      );
    });
  
    this.deliverableTotalItems = this.filteredProjectDeliverables.length;
    this.deliverableCurrentPage = 1;
    this.updateDeliverablePage();
  }
  
  // Clear Filters for Project Deliverables
  
// Clear Filters for Project Deliverables
clearDeliverableFilters(): void {
  this.deliverableNameFilter = '';
  this.customerNameFilter = '';
  this.projectNameFilter = '';
  this.phaseNameFiltered='';
  this.applyDeliverableFilters();
}

// Clear Individual Filter for Project Deliverables
clearDeliverableFilter(filterName: string): void {
  switch (filterName) {
    case 'deliverableNameFilter':
      this.deliverableNameFilter = '';
      break;
    case 'customerNameFilter':
      this.customerNameFilter = '';
      break;
    case 'projectNameFilter':
      this.projectNameFilter = '';
      break;
      case 'phaseNameFiltered': // New Case
      this.phaseNameFiltered = '';
      break;
  }
  this.applyDeliverableFilters(); // Reapply filters after clearing
}


 
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
  

      // Phases
  

      
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
      
        applyPhaseFilters(): void {
          this.filteredProjectPhases = this.projectPhases.filter(phase => {
            return (
              (this.phaseNameFilter ? phase.project_phase_name.toLowerCase().includes(this.phaseNameFilter.toLowerCase()) : true) &&
              (this.customerNameFilter ? phase.customer_name.toLowerCase().includes(this.customerNameFilter.toLowerCase()) : true) &&
              (this.projectNameFilter ? phase.project_name.toLowerCase().includes(this.projectNameFilter.toLowerCase()) : true)
            );
          });
      
          this.phaseTotalItems = this.filteredProjectPhases.length;
          this.phaseCurrentPage = 1;
          this.updatePhasePage();
        }
      
        clearPhaseFilters(): void {
          this.phaseNameFilter = '';
          this.customerNameFilter = '';
          this.projectNameFilter = '';
          this.applyPhaseFilters();
        }
      
        clearPhaseFilter(filterName: string): void {
          switch (filterName) {
            case 'phaseNameFilter':
              this.phaseNameFilter = '';
              break;
            case 'customerNameFilter':
              this.customerNameFilter = '';
              break;
            case 'projectNameFilter':
              this.projectNameFilter = '';
              break;
          }
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
      
}
