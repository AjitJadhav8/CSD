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
    ngOnInit(): void {

      this.fetchProjectDeliverables();
      this.dataService.getOptions().subscribe(
        (response) => {
          console.log('Roles, Departments, Users, and Customers:', response);
          // this.optionRoles = response.roles;
          // this.optionDepartments = response.departments;
          this.optionUsers = response.users;
          this.optionCustomers = response.customers;  // Store customer data
          this.optionTypeOfEngagement = response.typeOfEngagement;
          this.optionTypeOfProject = response.typeOfProject;
          this.optionProjectStatus = response.projectStatus;
          this.optionProject = response.projects;
  
          this.filteredProjects = []; // Initially empty
  
  
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
    }
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
  
    projectDeliverableForm: any = {
      project_id: '',
      project_deliverable_name: '',
      planned_start_date: '',
      actual_start_date: '',
      tentative_end_date: '',
      deliverable_description: '',
    };
    projectDeliverables: any[] = [];  // Store project deliverables data
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
          console.log('Project Deliverables Response:', response);
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
        (this.projectNameFilter ? deliverable.project_name.toLowerCase().includes(this.projectNameFilter.toLowerCase()) : true)
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
  
      this.dataService.addProjectDeliverable(this.projectDeliverableForm).subscribe(
        (response) => {
          console.log('Project deliverable added successfully:', response);
          this.fetchProjectDeliverables(); // Refresh the list
          // Success Toast Notification
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Project deliverable added successfully!',
            showConfirmButton: false,
            timer: 3000
          });
  
        },
        (error) => {
          console.error('Error adding project deliverable', error);
  
          // Error Toast Notification
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Error adding project deliverable!',
            showConfirmButton: false,
            timer: 3000
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
  
  

}
