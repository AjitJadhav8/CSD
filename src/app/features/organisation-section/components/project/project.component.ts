import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {


    constructor(private dataService: DataService,private http: HttpClient) {}
  


  ngOnInit(): void {
    this.fetchTaskCategories();


    this.fetchProjects();
this.fetchProjectDeliverables();

    this.dataService.getRolesAndDepartments().subscribe(
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

      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
    
  }

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
  
   
//   // Function to handle the form submission
submitProject() {
  this.dataService.addProject(this.projectForm).subscribe(
    (response) => {
      console.log('Project added successfully:', response);
      alert('Project added successfully!');
    },
    (error) => {
      console.error('Error adding project', error);
      alert('Error adding project!');
    }
  );
}

// submit project deliverable
projectDeliverableForm: any = {
  project_id: '',
  project_deliverable_name: '',
  planned_start_date: '',
  actual_start_date: '',
  tentative_end_date: '',
  deliverable_description: '',
};

submitProjectDeliverable() {
  this.dataService.addProjectDeliverable(this.projectDeliverableForm).subscribe(
    (response) => {
      console.log('Project deliverable added successfully:', response);
      alert('Project deliverable added successfully!');
    },
    (error) => {
      console.error('Error adding project deliverable', error);
      alert('Error adding project deliverable!');
    }
  );
}


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

// Function to fetch project deliverables
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





// Function to delete a project
deleteProject(projectId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this project?');

  if (confirmDelete) {
    this.dataService.deleteProject(projectId).subscribe(
      (response) => {
        console.log('Project deleted successfully:', response);
        alert('Project deleted successfully!');
        this.fetchProjects();
      },
      (error) => {
        console.error('Error deleting project:', error);
        alert('Error deleting project!');
      }
    );
  }
}


deleteProjectDeliverable(deliverableId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this project deliverable?');

  if (confirmDelete) {
    this.dataService.deleteProjectDeliverable(deliverableId).subscribe(
      (response) => {
        console.log('Project deliverable deleted successfully:', response);
        this.fetchProjectDeliverables(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting project deliverable:', error);
        alert('Error deleting project deliverable!');
      }
    );
  }
}


taskCategories: any[] = [];
taskCategoryForm = { task_category_name: '' };
  // Submit Task Category
  submitTaskCategory(): void {
    this.dataService.addTaskCategory(this.taskCategoryForm).subscribe(
      (response) => {
        alert('Task category added successfully!');
        this.taskCategoryForm.task_category_name = '';
        this.fetchTaskCategories();
      },
      (error) => {
        alert('Error adding task category!');
        console.error('Error adding task category:', error);
      }
    );
  }


 // Fetch Task Categories
 fetchTaskCategories(): void {
  this.dataService.getAllTaskCategories().subscribe(
    (response) => {
      this.taskCategories = response;
    },
    (error) => {
      console.error('Error fetching task categories:', error);
    }
  );
}

 // Delete Task Category
 deleteTaskCategory(taskCatId: number): void {
  const confirmDelete = window.confirm('Are you sure you want to delete this task category?');

  if (confirmDelete) {
    this.dataService.deleteTaskCategory(taskCatId).subscribe(
      (response) => {
        alert('Task category deleted successfully!');
        this.fetchTaskCategories();
      },
      (error) => {
        alert('Error deleting task category!');
        console.error('Error deleting task category:', error);
      }
    );
  }
 }




  selectedCustomer: number | null = null;  // Stores selected customer ID
  selectedProjectManager: number | null = null;  // Stores selected Project Manager ID

optionProject: any[] = [];
  optionTypeOfEngagement: any[] = [];
  optionTypeOfProject: any[] = [];
  optionProjectStatus: any[] = [];
  
  optionUsers: any[] = [];
  // optionDepartments:any;
  // optionRoles:any;
  optionCustomers: any[] = [];


  selectedSection: string = 'project';
  showTaskCategoryForm: boolean = false;
  showProjectDeliverableForm: boolean = false;
  showProjectRoleForm: boolean = false;
  showProjectManagerForm: boolean = false;
  showProjectForm: boolean = false;












  deleteProjectRole(id: number) {
  }

  deleteProjectManager(id: number) {
  }



  showTaskCategoryModal: boolean = false;
  showProjectDeliverableModal: boolean = false;
  showProjectRoleModal: boolean = false;
  showProjectManagerModal: boolean = false;
  showProjectModal: boolean = false;

  toggleModal(type: string) {
    switch (type) {
      case 'taskCategory':
        this.showTaskCategoryModal = !this.showTaskCategoryModal;
        break;
      case 'projectDeliverable':
        this.showProjectDeliverableModal = !this.showProjectDeliverableModal;
        break;
      case 'projectRole':
        this.showProjectRoleModal = !this.showProjectRoleModal;
        break;
      case 'projectManager':
        this.showProjectManagerModal = !this.showProjectManagerModal;
        break;
      case 'project':
        this.showProjectModal = !this.showProjectModal;
        break;
    }
  }


}
