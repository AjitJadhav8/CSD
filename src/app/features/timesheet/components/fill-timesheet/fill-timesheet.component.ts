import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';

@Component({
  selector: 'app-fill-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fill-timesheet.component.html',
  styleUrl: './fill-timesheet.component.css'
})
export class FillTimesheetComponent {
  userId: number | null = null; // Store user_id

  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }
  ngOnInit(): void {

     // Fetch user ID from localStorage
     const storedUserId = localStorage.getItem('user_id'); // Fetch directly
     if (storedUserId) {
      this.userId = Number(storedUserId); // Convert to number
    } else {
      console.error('User ID not found in local storage.');
    }
    console.log(this.userId);

    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Fetched Data:', response);

        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionProjectDeliverables = response.projectDeliverables; // Keep all deliverables intact
        this.optionTaskCategories = response.taskCategories;
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }

  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filterOptionProjects: any[] = [];  // Stores filtered projects based on selected customer

  optionProjectDeliverables: any[] = [];
  filterOptionProjectDeliverables: any[] = [];

  optionTaskCategories: any[] = [];
  selectedCustomer: number | string = '';
  selectedProject: number | string = '';


  onCustomerChange() {
    console.log('Selected Customer:', this.selectedCustomer);

    // Convert to number if necessary
    const customerId = Number(this.selectedCustomer);

    // Filter projects based on selected customer
    this.filterOptionProjects = this.optionProjects.filter(
      (project) => project.customer_id === customerId
    );

    this.selectedProject = ''; // Reset selected project
    this.selectedDeliverable = ''; // Reset selected deliverable
    this.filterOptionProjectDeliverables = []; // Clear deliverables
  }

  onProjectChange() {
    console.log('Selected Project:', this.selectedProject);

    const projectId = Number(this.selectedProject);
    console.log('Converted Project ID:', projectId);

    // Ensure optionProjectDeliverables is populated
    console.log('All Deliverables:', this.optionProjectDeliverables);

    // Filter from optionProjectDeliverables instead of modifying the original list
    this.filterOptionProjectDeliverables = this.optionProjectDeliverables.filter(
      (deliverable) => deliverable.project_id === projectId
    );

    console.log('Filtered Deliverables:', this.filterOptionProjectDeliverables);
  }







  selectedDeliverable: any;
  selectedTaskCategory: any;
  taskDescription: string = '';
  selectedHours: any;
  selectedMinutes: any;
  remainingHours: any;




  currentDate: Date = new Date();


  hoursList = Array.from({ length: 24 }, (_, i) => i);
  minutesList = [0, 15, 30, 45];
  taskStatusList = [
    { value: 0, label: 'In Progress' },
    { value: 1, label: 'Completed' }
  ];

  selectedTaskStatus = 0; // Default selection

  submitTimesheet() {
    if (!this.userId) {
      console.error('User ID not found. Cannot submit timesheet.');
      return;
    }

    const timesheetData = {
      user_id: this.userId, // Use the stored user_id
      customer: this.selectedCustomer,
      project: this.selectedProject,
      deliverable: this.selectedDeliverable,
      taskCategory: this.selectedTaskCategory,
      description: this.taskDescription,
      hours: this.selectedHours,
      minutes: this.selectedMinutes,
      status: this.selectedTaskStatus
    };

    console.log('Timesheet Submitted:', timesheetData);
  }

  


  copyLastEntry() {
    console.log('Last entry copied');
  }

}
