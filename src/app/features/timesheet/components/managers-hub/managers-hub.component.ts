import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-managers-hub',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './managers-hub.component.html',
  styleUrl: './managers-hub.component.css'
})
export class ManagersHubComponent {
  

  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }

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
  ngOnDestroy() {
    window.removeEventListener('storage', this.updateSectionFromStorage.bind(this));
  }

  updateSectionFromStorage() {
    this.selectedSection = localStorage.getItem('selectedManagersHubSection') || 'projectPhases';
  }

  changeSection(section: string) {
    this.selectedSection = section;
    localStorage.setItem('selectedManagersHubSection', section);
    window.dispatchEvent(new Event('storage'));
  }



  selectedSection: string = 'projectPhases';
  // currentManagerId = Number(localStorage.getItem('user_id')) || 0;
  currentManagerId: number = 0;

  ngOnInit(): void {
  
    this.currentManagerId = Number(localStorage.getItem('user_id')) || 0;
    console.log('Current Manager ID:', this.currentManagerId);

    this.selectedSection = localStorage.getItem('selectedManagersHubSection') || 'projectPhases';
    localStorage.setItem('selectedManagersHubSection', this.selectedSection);

    this.fetchManagerProjects(); // Add this line


    window.addEventListener('storage', this.updateSectionFromStorage.bind(this));

    this.fetchProjectDeliverables();
    this.fetchProjectPhases();
    this.fetchProjectTeamData();
    this.fetchProjectTeamsTimesheet();
    this.fetchReportingTeamData();
    this.fetchReportingTeamsTimesheet();
    this.fetchOptions();
  }

  managerProjects: any[] = [];
  fetchManagerProjects(): void {
    this.dataService.getManagerProjects(this.currentManagerId).subscribe(
      (response) => {
        this.managerProjects = response;
      },
      (error) => {
        console.error('Error fetching manager projects:', error);
      }
    );
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
        this.optionDeliverables = response.projectDeliverables;
        this.filteredProjects = [];
        this.filteredDeliverables = [];

      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  filterProjectsByCustomerForDeliverable(): void {
    if (this.projectDeliverableForm.customer_id) {
      this.filteredProjects = this.optionProject.filter(
        project => project.customer_id == this.projectDeliverableForm.customer_id
      );
    } else {
      this.filteredProjects = [];
    }
    this.projectDeliverableForm.project_id = null;
  }

  filterPhasesByProject(): void {
    const selectedProjectId = Number(this.selectedProjectId);
    if (selectedProjectId) {
      this.filteredPhases = this.optionPhases.filter(
        (phase) => Number(phase.project_id) === selectedProjectId
      );
    } else {
      this.filteredPhases = [];
    }
    this.filteredPhases = [...this.filteredPhases];
  }

  filteredProjects: any[] = [];

  filterProjects(): void {
    const selectedCustomerId = Number(this.projectDeliverableForm.customer_id);

    if (selectedCustomerId) {
      this.filteredProjects = this.optionProject.filter(
        project => Number(project.customer_id) === selectedCustomerId
      );
    } else {
      this.filteredProjects = [];
    }

    console.log("Filtered Projects:", this.filteredProjects);
  }



  deliverableCurrentPage: number = 1;
  deliverableTotalItems: number = 0;
  deliverableItemsPerPage: number = 30;
  deliverableMaxPageButtons: number = 5;
  filteredProjectDeliverables: any[] = [];
  paginatedProjectDeliverables: any[] = [];

  deliverableNameFilter: string = '';
  deliverableCustomerFilter: string = '';
  deliverableProjectFilter: string = '';
  deliverablePhaseFilter: string = '';


  projectDeliverableForm: any = {
    // phase_id: '',
    // customer_id: null,
    project_id: null,
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
    customer_id: null,
    customer_name: '',
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
    this.dataService.getManagerProjectDeliverables(this.currentManagerId).subscribe(
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

    const selectedProject = this.managerProjects.find(p => p.project_id == this.projectDeliverableForm.project_id);
    if (!selectedProject) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Invalid project selected!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    // Prepare the data to send
    const deliverableData = {
      customer_id: selectedProject.customer_id,
      project_id: this.projectDeliverableForm.project_id,
      project_deliverable_name: this.projectDeliverableForm.project_deliverable_name
    };

    this.dataService.addProjectDeliverableManager(deliverableData).subscribe({
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

  // Update clear method
  clearDeliverableFilters(): void {
    this.deliverableCustomerFilter = '';
    this.deliverableProjectFilter = '';
    this.deliverablePhaseFilter = '';
    this.deliverableNameFilter = '';
    this.applyDeliverableFilters();
  }


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

  // Add these properties
  isEditDeliverableModalOpen = false;
  editDeliverableData: any = {
    pd_id: null,
    // customer_id: null,
    project_id: null,
    project_deliverable_name: '',
    // Display fields (optional)
    // customer_name: '',
    project_name: ''
  };
  filteredEditProjects: any[] = [];

  // Add these methods
  // openEditDeliverableModal(deliverable: any): void {
  //   this.editDeliverableData = {
  //     pd_id: deliverable.pd_id,
  //     customer_id: deliverable.customer_id,
  //     project_id: deliverable.project_id,
  //     project_deliverable_name: deliverable.project_deliverable_name,
  //     customer_name: deliverable.customer_name,
  //     project_name: deliverable.project_name
  //   };

  //   this.filteredEditProjects = this.optionProject.filter(
  //     p => p.customer_id == deliverable.customer_id
  //   );

  //   this.isEditDeliverableModalOpen = true;
  // }

  // Update the open modal methods
openEditDeliverableModal(deliverable: any): void {
  this.editDeliverableData = {
    pd_id: deliverable.pd_id,
    project_id: deliverable.project_id,
    project_deliverable_name: deliverable.project_deliverable_name,
    project_name: deliverable.project_name
  };
  this.isEditDeliverableModalOpen = true;
}


  closeEditDeliverableModal(): void {
    this.isEditDeliverableModalOpen = false;
    this.editDeliverableData = {
      pd_id: null,
      customer_id: null,
      project_id: null,
      project_deliverable_name: '',
      customer_name: '',
      project_name: ''
    };
  }

  onEditCustomerChangeDel(): void {
    // Reset project and deliverable fields
    this.editDeliverableData.project_id = null;

    // Filter projects for the selected customer
    this.filteredEditProjects = this.editDeliverableData.customer_id
      ? this.optionProject.filter(
        project => project.customer_id == this.editDeliverableData.customer_id
      )
      : [];

    console.log('Filtered projects after customer change:', this.filteredEditProjects); // Debug log
  }
// Update the update methods
updateProjectDeliverable(form: NgForm): void {
  if (form.invalid || !this.editDeliverableData.pd_id) {
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

  const selectedProject = this.managerProjects.find(p => p.project_id == this.editDeliverableData.project_id);
  if (!selectedProject) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Invalid project selected!',
      showConfirmButton: false,
      timer: 3000
    });
    return;
  }

  const payload = {
    project_id: this.editDeliverableData.project_id,
    project_deliverable_name: this.editDeliverableData.project_deliverable_name,
    customer_id: selectedProject.customer_id
  };

  // Get original deliverable for comparison
  const originalDeliverable = this.projectDeliverables.find(d => d.pd_id === this.editDeliverableData.pd_id);
  const hasHierarchyChanged = originalDeliverable.project_id !== this.editDeliverableData.project_id;

  if (hasHierarchyChanged) {
    Swal.fire({
      title: 'Change Project Hierarchy?',
      text: 'Changing project will move this deliverable. Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDeliverableUpdate(payload);
      }
    });
  } else {
    this.performDeliverableUpdate(payload);
  }
}

private performDeliverableUpdate(payload: any): void {
  this.dataService.updateProjectDeliverable(this.editDeliverableData.pd_id, payload).subscribe(
    () => {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Project deliverable updated successfully!',
        showConfirmButton: false,
        timer: 3000
      });
      this.fetchProjectDeliverables();
      this.closeEditDeliverableModal();
    },
    (error) => {
      console.error('Error updating project deliverable:', error);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Error updating project deliverable!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  );
}


  // ----------------- Project Phasese -----------------------



  filterProjectsForPhases(): void {
    if (this.projectPhaseForm.customer_id) {
      this.filteredProjects = this.optionProject.filter(
        project => project.customer_id == this.projectPhaseForm.customer_id
      );
    } else {
      this.filteredProjects = [];
    }
    // Reset all dependent fields when customer changes
    this.projectPhaseForm.project_id = null;
    this.filterDeliverablesForPhases(); // This will clear deliverables too
  }
  filterDeliverablesForPhases(): void {
    if (this.projectPhaseForm.project_id) {
      this.filteredDeliverables = this.optionDeliverables.filter(
        deliverable => deliverable.project_id == this.projectPhaseForm.project_id
      );
    } else {
      this.filteredDeliverables = [];
    }
    this.projectPhaseForm.pd_id = null;
  }
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
  phaseDeliverableFilter: string = '';
  filteredDeliverables: any[] = [];
  optionDeliverables: any[] = [];

  // Form Model
  projectPhaseForm: any = {
    // customer_id: null,
    project_id: null,
    pd_id: null,

    project_phase_name: ''
  };

  // Data Storage
  projectPhases: any[] = [];

  fetchProjectPhases(): void {
    this.dataService.getManagerProjectPhases(this.currentManagerId).subscribe(
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
        (!this.phaseDeliverableFilter || phase.project_deliverable_name === this.phaseDeliverableFilter) &&
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

  // Add these properties
  isEditPhaseModalOpen = false;
  editPhaseData: any = {
    phase_id: null,
    // customer_id: null,
    project_id: null,
    pd_id: null,
    project_phase_name: '',
    // Display fields (optional)
    // customer_name: '',
    project_name: '',
    project_deliverable_name: ''
  };
  filteredEditDeliverables: any[] = [];

  // Add these methods
  // openEditPhaseModal(phase: any): void {
  //   this.editPhaseData = {
  //     phase_id: phase.phase_id,
  //     customer_id: phase.customer_id,
  //     project_id: phase.project_id,
  //     pd_id: phase.pd_id,
  //     project_phase_name: phase.project_phase_name,
  //     customer_name: phase.customer_name,
  //     project_name: phase.project_name,
  //     project_deliverable_name: phase.project_deliverable_name
  //   };

  //   this.filteredEditProjects = this.optionProject.filter(
  //     p => p.customer_id == phase.customer_id
  //   );
  //   this.filteredEditDeliverables = this.optionDeliverables.filter(
  //     d => d.project_id == phase.project_id
  //   );

  //   this.isEditPhaseModalOpen = true;
  // }

  openEditPhaseModal(phase: any): void {
    this.editPhaseData = {
      phase_id: phase.phase_id,
      project_id: phase.project_id,
      pd_id: phase.pd_id,
      project_phase_name: phase.project_phase_name,
      project_name: phase.project_name,
      project_deliverable_name: phase.project_deliverable_name
    };
  
    // Initialize filtered deliverables
    this.filteredEditDeliverables = this.optionDeliverables.filter(
      d => d.project_id == phase.project_id
    );
  
    this.isEditPhaseModalOpen = true;
  }

  closeEditPhaseModal(): void {
    this.isEditPhaseModalOpen = false;
    this.editPhaseData = {
      phase_id: null,
      customer_id: null,
      project_id: null,
      pd_id: null,
      project_phase_name: '',
      customer_name: '',
      project_name: '',
      project_deliverable_name: ''
    };
  }

  onEditCustomerChange(): void {
    this.editPhaseData.project_id = null;
    this.editPhaseData.pd_id = null;
    this.filteredEditProjects = this.optionProject.filter(
      p => p.customer_id == this.editPhaseData.customer_id
    );
    this.filteredEditDeliverables = [];
  }

  onEditProjectChange(): void {
    this.editPhaseData.pd_id = null;
    this.filteredEditDeliverables = this.optionDeliverables.filter(
      d => d.project_id == this.editPhaseData.project_id
    );
  }

  updateProjectPhase(form: NgForm): void {
    if (form.invalid || !this.editPhaseData.phase_id) {
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

    const payload = {
      pd_id: this.editPhaseData.pd_id,
      project_phase_name: this.editPhaseData.project_phase_name
    };

    // Get original phase for comparison
    const originalPhase = this.projectPhases.find(p => p.phase_id === this.editPhaseData.phase_id);
    const hasHierarchyChanged = originalPhase.pd_id !== this.editPhaseData.pd_id;

    if (hasHierarchyChanged) {
      Swal.fire({
        title: 'Change Project Hierarchy?',
        text: 'Changing customer/project/deliverable will move this phase. Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.performPhaseUpdate();
        }
      });
    } else {
      this.performPhaseUpdate();
    }
  }

  private performPhaseUpdate(): void {
    this.dataService.updateProjectPhase(this.editPhaseData.phase_id, {
      pd_id: this.editPhaseData.pd_id,
      project_phase_name: this.editPhaseData.project_phase_name
    }).subscribe(
      () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project phase updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchProjectPhases();
        this.closeEditPhaseModal();
        this.fetchManagerProjects();
      },
      (error) => {
        console.error('Error updating project phase:', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error updating project phase!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
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
  teamAllocationStatusFilter: boolean | null = null;
  teamBilledStatusFilter: boolean | null = null;
  teamStartDateFrom: string = '';
  teamEndDateTo: string = '';

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

      const matchesAllocationStatus = this.teamAllocationStatusFilter === null ||
        (this.teamAllocationStatusFilter === true && member.allocation_status === 1) ||
        (this.teamAllocationStatusFilter === false && member.allocation_status === 0);


      const matchesBilledStatus = this.teamBilledStatusFilter === null ||
        (this.teamBilledStatusFilter === true && member.billed_status === 1) ||
        (this.teamBilledStatusFilter === false && member.billed_status === 0);
      const formatDate = (dateString: string) => {
        if (!dateString) return '';

        // Convert UTC date to local timezone correctly
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        // Format as YYYY-MM-DD
        return localDate.toISOString().split('T')[0];
      }

      // Date filtering
      // Apply date filtering with formatted dates
      const matchesStartDate = !this.teamStartDateFrom ||
        formatDate(member.start_date) === formatDate(this.teamStartDateFrom);

      // End date exact match
      const matchesEndDate = !this.teamEndDateTo ||
        formatDate(member.end_date) === formatDate(this.teamEndDateTo);

      // Combine all conditions
      return matchesCustomer &&
        matchesProject &&
        matchesManager &&
        matchesEmployee &&
        matchesRole &&
        matchesAllocationStatus &&
        matchesBilledStatus &&
        matchesStartDate &&
        matchesEndDate;

    });

    this.teamCurrentPage = 1;
    this.updateTeamPage();
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    return localDate.toISOString().split('T')[0];
  }

  clearTeamFilters(): void {
    this.teamCustomerFilter = '';
    this.teamProjectFilter = '';
    this.teamManagerFilter = '';
    this.teamEmployeeFilter = '';
    this.teamRoleFilter = '';
    this.teamAllocationStatusFilter = null;
    this.teamBilledStatusFilter = null;
    this.teamStartDateFrom = '';
    this.teamEndDateTo = '';
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
  timesheetDateFilter: string = '';
  timesheetStatusFilter: number | null = null;
  timesheetDeliverableFilter: string = '';

  // Options
  optionTeamMembers: any[] = [];
  optionProjectsForTimesheet: any[] = [];
  optionPhasesForTimesheet: any[] = [];
  optionDeliverablesForTimesheet: any[] = []; // Populate this with your deliverables data

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
        // Add deliverables filter options
        this.optionDeliverablesForTimesheet = this.getUniqueSimpleItems(
          this.timesheetData,
          'project_deliverable_name',
          'pd_id' // or whatever your deliverable ID field is called
        );

        console.log('Processed options:', {
          teamMembers: this.optionTeamMembers,
          projects: this.optionProjectsForTimesheet,
          phases: this.optionPhasesForTimesheet,
          deliverables: this.optionDeliverablesForTimesheet // Added deliverables to log

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

      // Debug status values first
      // Employee filter - compare by ID
      const matchesEmployee = !this.timesheetEmployeeFilter ||
        timesheet.user_id == this.timesheetEmployeeFilter;

      const matchesProject = !this.timesheetProjectFilter ||
        timesheet.project_id == this.timesheetProjectFilter;

      // Phase filter - compare by ID
      const matchesPhase = !this.timesheetPhaseFilter ||
        timesheet.phase_id == this.timesheetPhaseFilter;

      // New Deliverable filter
      const matchesDeliverable = !this.timesheetDeliverableFilter ||
        timesheet.pd_id == this.timesheetDeliverableFilter;



      const matchesStatus = this.timesheetStatusFilter === null ||
        timesheet.task_status === this.timesheetStatusFilter;

      // Date filtering
      // Single date filter (exact match)
      const matchesDate = !this.timesheetDateFilter ||
        this.formatDate(timesheet.timesheet_date) ===
        this.formatDate(this.timesheetDateFilter);

      return matchesEmployee && matchesProject && matchesPhase && matchesDeliverable &&
        matchesStatus && matchesDate;
    });

    this.timesheetCurrentPage = 1;
    this.updateTimesheetPage();
  }

  clearTimesheetFilters(): void {
    this.timesheetEmployeeFilter = '';
    this.timesheetProjectFilter = '';
    this.timesheetPhaseFilter = '';
    this.timesheetDeliverableFilter = '';
    this.timesheetDateFilter = '';
    this.timesheetStatusFilter = null;
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

  calculateTimesheetTotalTime(): { hours: number, minutes: number } {
    if (!this.filteredTimesheetData || this.filteredTimesheetData.length === 0) {
      return { hours: 0, minutes: 0 };
    }
  
    let totalMinutes = this.filteredTimesheetData.reduce((sum, entry) => {
      return sum + (entry.hours * 60) + entry.minutes;
    }, 0);
  
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return { hours, minutes };
  }
  
  calculateTimesheetTotalHours(): number {
    const totalTime = this.calculateTimesheetTotalTime();
    return totalTime.hours + (totalTime.minutes / 60);
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
  reportingAllocationStatusFilter: boolean | null = null;
  reportingBilledStatusFilter: boolean | null = null;
  reportingStartDateFrom: string = '';
  reportingEndtDate: string = '';
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
      // Allocation status filter (1=true=Active, 0=false=Inactive)
      const matchesAllocationStatus = this.reportingAllocationStatusFilter === null ||
        (this.reportingAllocationStatusFilter === true && member.allocation_status === 1) ||
        (this.reportingAllocationStatusFilter === false && member.allocation_status === 0);

      // Billed status filter (1=true=Billed, 0=false=Not Billed)
      const matchesBilledStatus = this.reportingBilledStatusFilter === null ||
        (this.reportingBilledStatusFilter === true && member.billed_status === 1) ||
        (this.reportingBilledStatusFilter === false && member.billed_status === 0);

      const formatDate = (dateString: string) => {
        if (!dateString) return '';

        // Convert UTC date to local timezone correctly
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        // Format as YYYY-MM-DD
        return localDate.toISOString().split('T')[0];
      }

      // Date filtering
      const matchesStartDate = !this.reportingStartDateFrom ||
        formatDate(member.start_date) === formatDate(this.reportingStartDateFrom);

      const matchesEndDate = !this.reportingEndtDate ||
        formatDate(member.end_date) === formatDate(this.reportingEndtDate);

      return matchesCustomer && matchesProject && matchesManager &&
        matchesEmployee && matchesRole && matchesAllocationStatus &&
        matchesBilledStatus && matchesStartDate && matchesEndDate;
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
    this.reportingAllocationStatusFilter = null;
    this.reportingBilledStatusFilter = null;
    this.reportingStartDateFrom = '';
    this.reportingEndtDate = '';
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
  reportingTimesheetDeliverableFilter: string = '';
  reportingTimesheetDateFrom: string = '';
  reportingTimesheetDateTo: string = '';
  reportingTimesheetDateFilter: string = '';
  reportingTimesheetStatusFilter: number | null = null;


  // Pagination
  reportingTimesheetCurrentPage: number = 1;
  reportingTimesheetItemsPerPage: number = 30;
  reportingTimesheetMaxPageButtons: number = 5;

  // Dropdown options
  optionReportingTeamMembers: any[] = [];
  optionReportingProjects: any[] = [];
  optionReportingPhases: any[] = [];
  optionReportingDeliverables: any[] = [];

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
      .filter((item: { id: number, fullName: string }) => item.id && item.fullName);

    // Projects
    this.optionReportingProjects = Array.from(
      new Set(this.reportingTimesheetData.map(t => JSON.stringify({
        id: t.project_id,
        name: t.project_name
      })))
    ).map(item => JSON.parse(item))
      .filter((item: { id: number, name: string }) => item.id && item.name);

    // Phases
    this.optionReportingPhases = Array.from(
      new Set(this.reportingTimesheetData.map(t => JSON.stringify({
        id: t.phase_id,
        name: t.project_phase_name
      })))
    ).map(item => JSON.parse(item))
      .filter((item: { id: number, name: string }) => item.id && item.name);

    // Deliverables
    this.optionReportingDeliverables = Array.from(
      new Set(this.reportingTimesheetData.map(t => JSON.stringify({
        id: t.pd_id,
        name: t.project_deliverable_name
      })))
    ).map(item => JSON.parse(item))
      .filter((item: { id: number, name: string }) => item.id && item.name);
  }



  // Filter methods
  applyReportingTimesheetFilters(): void {
    console.log('Current Filters:', {
      employee: this.reportingTimesheetEmployeeFilter,
      project: this.reportingTimesheetProjectFilter,
      phase: this.reportingTimesheetPhaseFilter,
      status: this.reportingTimesheetStatusFilter,
      deliverable: this.reportingTimesheetDeliverableFilter,
      date: this.reportingTimesheetDateFilter
    });
    this.filteredReportingTimesheetData = this.reportingTimesheetData.filter(timesheet => {
      const matchesEmployee = !this.reportingTimesheetEmployeeFilter ||
        timesheet.user_id === this.reportingTimesheetEmployeeFilter;

      const matchesProject = !this.reportingTimesheetProjectFilter ||
        timesheet.project_id === this.reportingTimesheetProjectFilter;

      const matchesPhase = !this.reportingTimesheetPhaseFilter ||
        timesheet.phase_id === this.reportingTimesheetPhaseFilter;


      const matchesStatus = this.reportingTimesheetStatusFilter === null ||
        timesheet.task_status === this.reportingTimesheetStatusFilter;


      const matchesDeliverable = !this.reportingTimesheetDeliverableFilter ||
        timesheet.pd_id == this.reportingTimesheetDeliverableFilter;

      // Date filtering
      const matchesDate = !this.reportingTimesheetDateFilter ||
        this.formatDate(timesheet.timesheet_date) ===
        this.formatDate(this.reportingTimesheetDateFilter);

      return matchesEmployee && matchesProject && matchesPhase && matchesDeliverable &&
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
    this.reportingTimesheetDateFilter = '';
    this.reportingTimesheetStatusFilter = null;
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


// Add these methods to your component class
calculateFilteredTotalTime(): { hours: number, minutes: number } {
  if (!this.filteredReportingTimesheetData || this.filteredReportingTimesheetData.length === 0) {
    return { hours: 0, minutes: 0 };
  }

  let totalMinutes = this.filteredReportingTimesheetData.reduce((sum, entry) => {
    return sum + (entry.hours * 60) + entry.minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes };
}

calculateFilteredTotalHours(): number {
  const totalTime = this.calculateFilteredTotalTime();
  return totalTime.hours + (totalTime.minutes / 60);
}



}
