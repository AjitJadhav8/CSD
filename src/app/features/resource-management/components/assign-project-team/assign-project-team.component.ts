import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  allocationStatuses: string[] = ["Shadow", "Employee"];
  allocationPercentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];



  selectedCustomerId: number | null = null;

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
        this.optionProjectRoles = response.positions;
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


  selectedProjectId: number | null = null;
  selectedEmployeeId: number | null = null;
  selectedProjectRoleId: number | null = null;
  selectedProjectManagerId: number | null = null;
  selectedAllocationStatus: string | null = null;
  selectedAllocationPercentage: number | null = null;
  startDate: string | null = null;
  tentativeEndDate: string | null = null;


  //submit assign project team
  submitAssignProjectTeam() {
    if (!this.selectedCustomerId || !this.selectedProjectId || !this.selectedEmployeeId || !this.selectedProjectRoleId ||
        !this.selectedProjectManagerId || !this.startDate || !this.selectedAllocationStatus ||
        this.selectedAllocationPercentage === undefined) {
        
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
        allocation_percentage: Number(this.selectedAllocationPercentage)
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
        },
        error: (error) => {
            if (error.status === 400) {
                if (error.error.error.includes('Employee is already assigned to this project')) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: 'Employee is already assigned to this project!',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else if (error.error.error.includes('Only')) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'error',
                        title: error.error.error, // Shows "Only X% allocation is remaining"
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


  assignedProjectTeams: any[] = []; // <-- Declare this property

   // ✅ Fetch Assigned Project Teams
   fetchAssignedProjectTeams(): void {
    this.rmgService.getAllProjectTeams().subscribe(
      (response) => {
        this.assignedProjectTeams = response;
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



}
