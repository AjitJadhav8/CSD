import { Component } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assign-project-team',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-project-team.component.html',
  styleUrl: './assign-project-team.component.css'
})
export class AssignProjectTeamComponent {
  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }

  userId: number | null = null;
  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filteredProjects: any[] = [];

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
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        console.log(this.optionCustomers);
        console.log(this.optionProjects);

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

  
}
