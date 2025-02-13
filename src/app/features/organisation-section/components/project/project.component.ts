import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  selectedSection: string = 'taskCategory';
  showTaskCategoryForm: boolean = false;
  showProjectDeliverableForm: boolean = false;
  showProjectRoleForm: boolean = false;
  showProjectManagerForm: boolean = false;
  showProjectForm: boolean = false;

  projectRoles = [
    { id: 1, name: 'Developer' },
    { id: 2, name: 'Tester' }
  ];

  projectManagers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];

  projects = [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' }
  ];



  taskCategories = [
    { id: 1, name: 'Development', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Testing', activityDate: '2025-02-11', createdBy: 'Admin' }
  ];

  projectDeliverables = [
    { id: 1, name: 'Final Report', activityDate: '2025-02-10', createdBy: 'Admin' },
    { id: 2, name: 'Prototype', activityDate: '2025-02-11', createdBy: 'Admin' }
  ];

  deleteTaskCategory(id: number) {
    this.taskCategories = this.taskCategories.filter(task => task.id !== id);
  }

  deleteProjectDeliverable(id: number) {
    this.projectDeliverables = this.projectDeliverables.filter(deliverable => deliverable.id !== id);
  }

  deleteProjectRole(id: number) {
    this.projectRoles = this.projectRoles.filter(role => role.id !== id);
  }

  deleteProjectManager(id: number) {
    this.projectManagers = this.projectManagers.filter(manager => manager.id !== id);
  }

  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
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
