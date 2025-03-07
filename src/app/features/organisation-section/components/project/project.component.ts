import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

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
    this.fetchTaskCategories();
    this.fetchProjects();
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


  // ------------------Project------------------------

  project = {
    project_id: null, // Primary key
    project_name: '',
    customer_id: null, // Foreign key reference
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

  // ------------------Project Deliverable------------------------

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
      },
      (error) => {
        console.error('Error fetching project deliverables:', error);
      }
    );
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


  // ------------------Project task category ------------------------

  taskCategoryCurrentPage: number = 1;
  taskCategoryTotalItems: number = 0;
  taskCategoryItemsPerPage: number = 10; // Adjust as needed
  taskCategoryMaxPageButtons: number = 5; // Show only 5 page numbers at a time
  filteredTaskCategories: any[] = [];
  paginatedTaskCategories: any[] = [];
    taskCategoryNameFilter: string = '';


  taskCategories: any[] = [];
  taskCategoryForm = { task_category_name: '' };

  fetchTaskCategories(): void {
    this.dataService.getAllTaskCategories().subscribe(
      (response) => {
        this.taskCategories = response;
        this.filteredTaskCategories = [...this.taskCategories];
        this.taskCategoryTotalItems = this.filteredTaskCategories.length;
        this.updateTaskCategoryPage();
      },
      (error) => {
        console.error('Error fetching task categories:', error);
      }
    );
  }
  
  // Apply Filters
  applyTaskCategoryFilters(): void {
    this.filteredTaskCategories = this.taskCategories.filter(task => {
      return (
        (this.taskCategoryNameFilter ? task.task_category_name.toLowerCase().includes(this.taskCategoryNameFilter.toLowerCase()) : true)
      );
    });

    this.taskCategoryTotalItems = this.filteredTaskCategories.length;
    this.taskCategoryCurrentPage = 1;
    this.updateTaskCategoryPage();
  }

  // Clear Filters
  clearTaskCategoryFilters(): void {
    this.taskCategoryNameFilter = '';
    this.applyTaskCategoryFilters();
  }

  // Clear Individual Filter
  clearTaskCategoryFilter(filterName: string): void {
    switch (filterName) {
      case 'taskCategoryNameFilter':
        this.taskCategoryNameFilter = '';
        break;
    }
    this.applyTaskCategoryFilters(); // Reapply filters after clearing
  }

  // Pagination Logic
  updateTaskCategoryPage(): void {
    const startIndex = (this.taskCategoryCurrentPage - 1) * this.taskCategoryItemsPerPage;
    const endIndex = startIndex + this.taskCategoryItemsPerPage;
    this.paginatedTaskCategories = this.filteredTaskCategories.slice(startIndex, endIndex);
  }

  changeTaskCategoryPage(page: number): void {
    if (page >= 1 && page <= this.taskCategoryTotalPages) {
      this.taskCategoryCurrentPage = page;
      this.updateTaskCategoryPage();
    }
  }

  get taskCategoryTotalPages(): number {
    return Math.ceil(this.filteredTaskCategories.length / this.taskCategoryItemsPerPage);
  }

  getVisibleTaskCategoryPageNumbers(): number[] {
    const totalPages = this.taskCategoryTotalPages;
    const halfRange = Math.floor(this.taskCategoryMaxPageButtons / 2);

    let startPage = Math.max(1, this.taskCategoryCurrentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + this.taskCategoryMaxPageButtons - 1);

    if (endPage - startPage + 1 < this.taskCategoryMaxPageButtons) {
      startPage = Math.max(1, endPage - this.taskCategoryMaxPageButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }


  submitTaskCategory(taskCategoryFormRef: NgForm): void {
    if (taskCategoryFormRef.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Task Category Name is required!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    this.dataService.addTaskCategory(this.taskCategoryForm).subscribe(
      (response) => {
        console.log('Task category added successfully:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Task category added successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        // Reset form field
        taskCategoryFormRef.resetForm();
        this.taskCategoryForm.task_category_name = '';
        this.fetchTaskCategories();
      },
      (error) => {
        console.error('Error adding task category:', error);

        // Error Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error adding task category!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    );
  }

  deleteTaskCategory(taskCatId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This task category will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteTaskCategory(taskCatId).subscribe(
          (response) => {
            console.log('Task category deleted successfully:', response);
            this.fetchTaskCategories(); // Refresh the list

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Task category deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });

          },
          (error) => {
            console.error('Error deleting task category:', error);

            // Error Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Error deleting task category!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        );
      }
    });
  }


  // ------------------Toggle Section ------------------------


  selectedSection: string = 'project';
  showTaskCategoryModal: boolean = false;
  showProjectDeliverableModal: boolean = false;
  showProjectModal: boolean = false;

  toggleModal(type: string) {
    switch (type) {
      case 'taskCategory':
        this.showTaskCategoryModal = !this.showTaskCategoryModal;
        break;
      case 'projectDeliverable':
        this.showProjectDeliverableModal = !this.showProjectDeliverableModal;
        break;
      case 'project':
        this.showProjectModal = !this.showProjectModal;
        break;
    }
  }

}
