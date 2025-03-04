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

      console.error('Missing required fields');

      // Show warning if required fields are missing
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
      end_date: this.tentativeEndDate || null, // Optional field
      allocation_status: this.selectedAllocationStatus,
      allocation_percentage: Number(this.selectedAllocationPercentage) // Convert to number
    };

    this.rmgService.submitAssignProjectTeam(assignmentData).subscribe({
      next: (response) => {
        console.log('Project Team Assigned:', response);

        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Project team assigned successfully!',
          showConfirmButton: false,
          timer: 3000
        });

        // setTimeout(() => this.fetchProjectAssignments(), 100);
      },
      error: (error) => {
        console.error('Error assigning project team:', error);

        // Error Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Failed to assign project team!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

}
