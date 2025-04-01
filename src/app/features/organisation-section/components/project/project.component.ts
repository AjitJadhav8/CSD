import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

  constructor(private dataService: DataService, private http: HttpClient) { }
 
  ngOnInit(): void {

    this.selectedSection = 'project';
    localStorage.setItem('selectedProjectSection', 'project');

    this.selectedSection = localStorage.getItem('selectedProjectSection') || 'project';

    // Listen for changes (e.g., when clicking Project Deliverable)
    window.addEventListener('storage', this.updateSectionFromStorage.bind(this));
    
    // this.fetchTaskCategories();
    this.fetchProjects();
    this.fetchProjectDeliverables();
    this.fetchProjectPhases();
    this.fetchOptions(); // Call the new function instead of having the logic here

    // this.dataService.getOptions().subscribe(
    //   (response) => {
    //     console.log('Roles, Departments, Users, and Customers:', response);
    //     // this.optionRoles = response.roles;
    //     // this.optionDepartments = response.departments;
    //     this.optionUsers = response.users;
    //     this.optionCustomers = response.customers;  // Store customer data
    //     this.optionTypeOfEngagement = response.typeOfEngagement;
    //     this.optionTypeOfProject = response.typeOfProject;
    //     this.optionProjectStatus = response.projectStatus;
    //     this.optionProject = response.projects;
    //     this.optionPhases = response.phases; // Store phases data


    //     this.filteredProjects = []; // Initially empty


    //   },
    //   (error) => {
    //     console.error('Error fetching data', error);
    //   }
    // );
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Roles, Departments, Users, and Customers:', response);
                // this.optionRoles = response.roles;
        // this.optionDepartments = response.departments;
        this.optionUsers = response.users;
        this.optionCustomers = response.customers;
        this.optionTypeOfEngagement = response.typeOfEngagement;
        this.optionTypeOfProject = response.typeOfProject;
        this.optionProjectStatus = response.projectStatus;
        this.optionProject = response.projects;
        this.optionPhases = response.phases;
        this.optionProjectManagers = response.users;
        this.optionProjectDeliverables = response.projectDeliverables;


        this.filteredProjects = []; // Initially empty
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  optionProjectManagers: any[] = [];
  optionProjectDeliverables: any[] = [];

  ngOnDestroy() {
    window.removeEventListener('storage', this.updateSectionFromStorage.bind(this));
  }

  updateSectionFromStorage() {
    this.selectedSection = localStorage.getItem('selectedProjectSection') || 'project';
  }

  changeSection(section: string) {
    this.selectedSection = section;
    localStorage.setItem('selectedProjectSection', section);
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


  // ------------------Project------------------------

  projectCurrentPage: number = 1;
projectTotalItems: number = 0;
projectItemsPerPage: number = 30; // Adjust as needed
projectMaxPageButtons: number = 5; // Show only 5 page numbers at a time
paginatedProjects: any[] = [];

// Filters for Projects
projectNameFilterOfProject: string = '';
projectCustomerNameFilter: string = '';
projectManagerFilterOfProject: string = '';
typeOfProjectFilter: string = '';
typeOfEngagementFilter: string = '';
projectStatusFilter: string = '';
plannedStartDateFilter: string = '';
actualStartDateFilter: string = '';
tentativeEndDateFilter: string = '';
projectDescriptionFilter: string = '';


  project = {
    project_id: null, // Primary key
    project_name: '',
    customer_id: 'null', // Foreign key reference
    customer_name: '',
    project_manager_id: null, // Foreign key reference
    project_manager: '',
    type_of_project_id: null, // Foreign key reference
    type_of_project: '',
    type_of_engagement_id: null, // Foreign key reference
    type_of_engagement: '',
    project_status_id: null, // Foreign key reference
    project_status: '',
    planned_start_date: '', // Format as 'YYYY-MM-DD' if needed
    actual_start_date: '', // Format as 'YYYY-MM-DD' if needed
    tentative_end_date: '', // Format as 'YYYY-MM-DD' if needed
    project_description: '',
    is_deleted: null, // For soft delete
    created_at: '', // Optional: Track creation date
    updated_at: '' // Optional: Track last update date
  };
  projects: any[] = [];  // Store the project data
  // Define form object
  projectForm: any = {
    customer_id: '',
    project_name: '',
    planned_start_date: '',
    actual_start_date: '',
    type_of_project_id: '',
    type_of_engagement_id: '',
    project_manager_id: '',
    project_status_id: '',
    tentative_end_date: '',
    project_description: '',
  };

  fetchProjects(): void {
    this.dataService.getAllProjects().subscribe(
      (response) => {
        console.log('Projects Response:', response);
        this.projects = response;
        this.filteredProjects = [...this.projects];
      this.projectTotalItems = this.filteredProjects.length
      this.updateProjectPage();
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  submitProject(projectNgForm: NgForm): void {

    if (projectNgForm.invalid) {
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
      // Ensure tentative_end_date is after planned_start_date
      if (this.projectForm.tentative_end_date && this.projectForm.planned_start_date &&
        new Date(this.projectForm.tentative_end_date) < new Date(this.projectForm.planned_start_date)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Date Range',
            text: 'Tentative End Date should be after Planned Start Date!',
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false
        });
        return;
    }

    this.dataService.addProject(this.projectForm).subscribe(
      (response) => {
        console.log('Project added successfully:', response);
        this.fetchProjects();
        projectNgForm.resetForm();
        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end', // Change to 'bottom-end' if needed
          icon: 'success',
          title: 'Project added successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchOptions();

      },
      (error) => {
        console.error('Error adding project', error);

        // Error Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error adding project!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }


  deleteProject(projectId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This project will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteProject(projectId).subscribe(
          (response) => {
            console.log('Project deleted successfully:', response);
            this.fetchProjects(); // Refresh the list

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Project deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

          },
          (error) => {
            console.error('Error deleting project:', error);

            // Error Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Error deleting project!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        );
      }
    });
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';
  
    // Convert UTC date to local timezone correctly
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  
    // Format as YYYY-MM-DD
    return localDate.toISOString().split('T')[0];
  }

  isEditProjectModalOpen = false;
  editProjectFormData: any = {
    customer_id: '',
    project_name: '',
    planned_start_date: '',
    actual_start_date: '',
    type_of_project_id: '',
    type_of_engagement_id: '',
    project_manager_id: '',
    project_status_id: '',
    tentative_end_date: '',
    project_description: '',
  };
  editProjectId: number | null = null;

  // Open Edit Modal
  openEditProjectModal(project: any): void {
    this.editProjectFormData = {
      customer_id: project.customer_id || '',  // Ensure customer_id is set
      project_name: project.project_name || '',
      planned_start_date: this.formatDate(project.planned_start_date),
      actual_start_date: this.formatDate(project.actual_start_date),
      type_of_project_id: project.type_of_project_id || '',
      type_of_engagement_id: project.type_of_engagement_id || '',
      project_manager_id: project.project_manager_id || '', // Ensure project_manager_id is set
      project_status_id: project.project_status_id || '',
      tentative_end_date: this.formatDate(project.tentative_end_date),
      project_description: project.project_description || '',
    };
    this.editProjectId = project.project_id;
    this.isEditProjectModalOpen = true;
    console.log('afsd', this.editProjectFormData)
  }
  

  // Close Edit Modal
  closeEditProjectModal(): void {
    this.isEditProjectModalOpen = false;
    this.editProjectFormData = {
      customer_id: '',
      project_name: '',
      planned_start_date: '',
      actual_start_date: '',
      type_of_project_id: '',
      type_of_engagement_id: '',
      project_manager_id: '',
      project_status_id: '',
      tentative_end_date: '',
      project_description: '',
    };
    this.editProjectId = null;
  }

  // Update Project
  updateProject(editProjectForm: NgForm): void {
    if (editProjectForm.invalid || !this.editProjectId) {
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

    this.dataService.updateProject(this.editProjectId, this.editProjectFormData).subscribe({
      next: (response) => {
        console.log('Project updated successfully', response);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchProjects();
        this.closeEditProjectModal();
      },
      error: (error) => console.error('Error updating project:', error)
    });
  }





  filteredProjects: any[] = []; // Store filtered projects

  // Method to filter projects based on selected customer
  filterProjects(): void {
    const selectedCustomerId = Number(this.projectDeliverableForm.customer_id); 
  
    console.log("Selected Customer ID:", selectedCustomerId);
    console.log("Available Projects:", this.optionProject);
  
    if (selectedCustomerId) {
      this.filteredProjects = this.optionProject.filter(project => Number(project.customer_id) === selectedCustomerId);
      console.log("Filtered Projects:", this.filteredProjects);
    } else {
      this.filteredProjects = []; // No customer selected, show empty
    }
  
    // Trigger Angular Change Detection
    this.filteredProjects = [...this.filteredProjects];  
  }
  
  
// Apply Filters for Projects
// Apply Filters
applyProjectFilters(): void {

  this.filteredProjects = this.projects.filter(project => {
    return (
      (this.projectNameFilterOfProject ? project.project_id === +this.projectNameFilterOfProject : true) &&
      (this.projectCustomerNameFilter ? project.customer_id === +this.projectCustomerNameFilter : true) &&
      (this.projectManagerFilterOfProject ? project.project_manager_id === +this.projectManagerFilterOfProject : true) &&
      (this.typeOfProjectFilter ? project.type_of_project_id === +this.typeOfProjectFilter : true) && // Use ID for filtering
      (this.typeOfEngagementFilter ? project.type_of_engagement_id === +this.typeOfEngagementFilter : true) && // Use ID for filtering
      (this.projectStatusFilter ? project.project_status_id === +this.projectStatusFilter : true) && // Use ID for filtering
      (this.plannedStartDateFilter ? this.formatDate(project.planned_start_date) === this.plannedStartDateFilter : true) &&
      (this.actualStartDateFilter ? this.formatDate(project.actual_start_date) === this.actualStartDateFilter : true) &&
      (this.tentativeEndDateFilter ? this.formatDate(project.tentative_end_date) === this.tentativeEndDateFilter : true) &&
      (this.projectDescriptionFilter ? project.project_description?.toLowerCase().includes(this.projectDescriptionFilter.toLowerCase()) : true)
    );
  });

  console.log('Filtered Projects:', this.filteredProjects);
  this.projectTotalItems = this.filteredProjects.length;
  this.projectCurrentPage = 1;
  this.updateProjectPage();
}
// Clear Filters for Projects
clearProjectFilters(): void {
  this.projectNameFilterOfProject = '';
  this.projectCustomerNameFilter = '';
  this.projectManagerFilterOfProject = '';
  this.typeOfProjectFilter = '';
  this.typeOfEngagementFilter = '';
  this.projectStatusFilter = '';
  this.plannedStartDateFilter = '';
  this.actualStartDateFilter = '';
  this.tentativeEndDateFilter = '';
  this.projectDescriptionFilter = '';
  this.applyProjectFilters();
}

// Clear Individual Filter for Projects
// Clear Individual Filter
clearProjectFilter(filterName: string): void {
  switch (filterName) {
    case 'projectNameFilterOfProject':
      this.projectNameFilterOfProject = '';
      break;
    case 'projectCustomerNameFilter':
      this.projectCustomerNameFilter = '';
      break;
    case 'projectManagerFilterOfProject':
      this.projectManagerFilterOfProject = '';
      break;
    case 'typeOfProjectFilter':
      this.typeOfProjectFilter = '';
      break;
    case 'typeOfEngagementFilter':
      this.typeOfEngagementFilter = '';
      break;
    case 'projectStatusFilter':
      this.projectStatusFilter = '';
      break;
    case 'plannedStartDateFilter':
      this.plannedStartDateFilter = '';
      break;
    case 'actualStartDateFilter':
      this.actualStartDateFilter = '';
      break;
    case 'tentativeEndDateFilter':
      this.tentativeEndDateFilter = '';
      break;
    case 'projectDescriptionFilter':
      this.projectDescriptionFilter = '';
      break;
  }
  this.applyProjectFilters(); // Reapply filters after clearing
}

// Pagination Logic for Projects
updateProjectPage(): void {
  const startIndex = (this.projectCurrentPage - 1) * this.projectItemsPerPage;
  const endIndex = startIndex + this.projectItemsPerPage;
  this.paginatedProjects = this.filteredProjects.slice(startIndex, endIndex);
  console.log('Paginated Projects:', this.paginatedProjects); // <-- Add this line
}

changeProjectPage(page: number): void {
  if (page >= 1 && page <= this.projectTotalPages) {
    this.projectCurrentPage = page;
    this.updateProjectPage();
  }
}

get projectTotalPages(): number {
  return Math.ceil(this.filteredProjects.length / this.projectItemsPerPage);
}

getVisibleProjectPageNumbers(): number[] {
  const totalPages = this.projectTotalPages;
  const halfRange = Math.floor(this.projectMaxPageButtons / 2);

  let startPage = Math.max(1, this.projectCurrentPage - halfRange);
  let endPage = Math.min(totalPages, startPage + this.projectMaxPageButtons - 1);

  if (endPage - startPage + 1 < this.projectMaxPageButtons) {
    startPage = Math.max(1, endPage - this.projectMaxPageButtons + 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
}
 

  // ------------------Project Deliverable------------------------
  filterProjectsByCustomer(): void {
    if (this.projectDeliverableForm.customer_id) {
      this.filteredProjects = this.optionProject.filter(
        project => project.customer_id == this.projectDeliverableForm.customer_id
      );
    } else {
      this.filteredProjects = [];
      this.projectDeliverableForm.project_id = null;
    }
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
    customer_id: null,
    project_id: null,
    project_deliverable_name: ''
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

submitProjectDeliverable(form: NgForm): void {
    if (form.invalid) return;

    this.dataService.addProjectDeliverable(this.projectDeliverableForm).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Deliverable added successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        form.resetForm();
        this.projectDeliverableForm = {
          customer_id: null,
          project_id: null,
          project_deliverable_name: ''
        };
        this.fetchProjectDeliverables();
        this.fetchOptions();
      },
      error: (error) => {
        console.error('Error adding deliverable:', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error adding deliverable!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
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
  
// Apply Filters for Project Deliverables
applyDeliverableFilters(): void {
  this.filteredProjectDeliverables = this.projectDeliverables.filter(deliverable => {
    return (
      (!this.deliverableNameFilter ||
        deliverable.project_deliverable_name.toLowerCase().includes(this.deliverableNameFilter.toLowerCase()))&&
      (this.customerNameFilter ? deliverable.customer_id === +this.customerNameFilter : true) &&
      (this.projectNameFilter ? deliverable.project_id === +this.projectNameFilter : true)     
    );
  });

  this.deliverableTotalItems = this.filteredProjectDeliverables.length;
  this.deliverableCurrentPage = 1;
  this.updateDeliverablePage();
}

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

  


  // ----------- project Phase ------------------

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

  applyPhaseFilters(): void {
    this.filteredProjectPhases = this.projectPhases.filter(phase => {
      return (
        (this.phaseNameFilter ? phase.phase_id === +this.phaseNameFilter : true) &&
      (this.customerNameFilter ? phase.customer_id === +this.customerNameFilter : true) &&
      (this.projectNameFilter ? phase.project_id === +this.projectNameFilter : true)
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


  // ------------------Project task category ------------------------

  // taskCategoryCurrentPage: number = 1;
  // taskCategoryTotalItems: number = 0;
  // taskCategoryItemsPerPage: number = 30; 
  // taskCategoryMaxPageButtons: number = 5; 
  // filteredTaskCategories: any[] = [];
  // paginatedTaskCategories: any[] = [];
  //   taskCategoryNameFilter: string = '';

  // taskCategories: any[] = [];
  // taskCategoryForm = { task_category_name: '' };

  // fetchTaskCategories(): void {
  //   this.dataService.getAllTaskCategories().subscribe(
  //     (response) => {
  //       this.taskCategories = response;
  //       this.filteredTaskCategories = [...this.taskCategories];
  //       this.taskCategoryTotalItems = this.filteredTaskCategories.length;
  //       this.updateTaskCategoryPage();
  //     },
  //     (error) => {
  //       console.error('Error fetching task categories:', error);
  //     }
  //   );
  // }
  
  // applyTaskCategoryFilters(): void {
  //   this.filteredTaskCategories = this.taskCategories.filter(task => {
  //     return (
  //       (this.taskCategoryNameFilter ? task.task_category_name.toLowerCase().includes(this.taskCategoryNameFilter.toLowerCase()) : true)
  //     );
  //   });

  //   this.taskCategoryTotalItems = this.filteredTaskCategories.length;
  //   this.taskCategoryCurrentPage = 1;
  //   this.updateTaskCategoryPage();
  // }

  // clearTaskCategoryFilters(): void {
  //   this.taskCategoryNameFilter = '';
  //   this.applyTaskCategoryFilters();
  // }

  // clearTaskCategoryFilter(filterName: string): void {
  //   switch (filterName) {
  //     case 'taskCategoryNameFilter':
  //       this.taskCategoryNameFilter = '';
  //       break;
  //   }
  //   this.applyTaskCategoryFilters(); 
  // }

  // updateTaskCategoryPage(): void {
  //   const startIndex = (this.taskCategoryCurrentPage - 1) * this.taskCategoryItemsPerPage;
  //   const endIndex = startIndex + this.taskCategoryItemsPerPage;
  //   this.paginatedTaskCategories = this.filteredTaskCategories.slice(startIndex, endIndex);
  // }

  // changeTaskCategoryPage(page: number): void {
  //   if (page >= 1 && page <= this.taskCategoryTotalPages) {
  //     this.taskCategoryCurrentPage = page;
  //     this.updateTaskCategoryPage();
  //   }
  // }

  // get taskCategoryTotalPages(): number {
  //   return Math.ceil(this.filteredTaskCategories.length / this.taskCategoryItemsPerPage);
  // }

  // getVisibleTaskCategoryPageNumbers(): number[] {
  //   const totalPages = this.taskCategoryTotalPages;
  //   const halfRange = Math.floor(this.taskCategoryMaxPageButtons / 2);

  //   let startPage = Math.max(1, this.taskCategoryCurrentPage - halfRange);
  //   let endPage = Math.min(totalPages, startPage + this.taskCategoryMaxPageButtons - 1);

  //   if (endPage - startPage + 1 < this.taskCategoryMaxPageButtons) {
  //     startPage = Math.max(1, endPage - this.taskCategoryMaxPageButtons + 1);
  //   }

  //   return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  // }

  // submitTaskCategory(taskCategoryFormRef: NgForm): void {
  //   if (taskCategoryFormRef.invalid) {
  //     Swal.fire({
  //       toast: true,
  //       position: 'top-end',
  //       icon: 'warning',
  //       title: 'Task Category Name is required!',
  //       showConfirmButton: false,
  //       timer: 3000
  //     });
  //     return;
  //   }

  //   this.dataService.addTaskCategory(this.taskCategoryForm).subscribe(
  //     (response) => {
  //       console.log('Task category added successfully:', response);

  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'Task category added successfully!',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });

  //       taskCategoryFormRef.resetForm();
  //       this.taskCategoryForm.task_category_name = '';
  //       this.fetchTaskCategories();
  //     },
  //     (error) => {
  //       console.error('Error adding task category:', error);

  //       Swal.fire({
  //         toast: true,
  //         position: 'top-end',
  //         icon: 'error',
  //         title: 'Error adding task category!',
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //     }
  //   );
  // }

  // deleteTaskCategory(taskCatId: number): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This task category will be deleted!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.dataService.deleteTaskCategory(taskCatId).subscribe(
  //         (response) => {
  //           console.log('Task category deleted successfully:', response);
  //           this.fetchTaskCategories(); 

  //           Swal.fire({
  //             toast: true,
  //             position: 'top-end',
  //             icon: 'success',
  //             title: 'Task category deleted successfully!',
  //             showConfirmButton: false,
  //             timer: 3000
  //           });

  //         },
  //         (error) => {
  //           console.error('Error deleting task category:', error);

  //           Swal.fire({
  //             toast: true,
  //             position: 'top-end',
  //             icon: 'error',
  //             title: 'Error deleting task category!',
  //             showConfirmButton: false,
  //             timer: 3000
  //           });
  //         }
  //       );
  //     }
  //   });
  // }


  // ------------------Toggle Section ------------------------


  selectedSection: string = 'project';


}
