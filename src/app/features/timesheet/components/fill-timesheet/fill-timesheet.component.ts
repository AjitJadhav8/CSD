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
  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filterOptionProjects: any[] = [];  // Stores filtered projects based on selected customer
  optionProjectDeliverables: any[] = [];
  filterOptionProjectDeliverables: any[] = [];
  optionTaskCategories: any[] = [];
  selectedCustomer: number | string = '';
  selectedProject: number | null = null;
  selectedDeliverable: number | null = null;
  selectedHours: number | null = null;
  selectedMinutes: number | null = null;
  selectedTaskCategory: any;
  taskDescription: string = '';
  remainingHours: any;

  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }
  ngOnInit(): void {
    this.fetchTimesheets();

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


  timesheetData: any;

  fetchTimesheets(): void {
    const storedUserId = localStorage.getItem('user_id'); // Fetch user ID from local storage
  
    if (!storedUserId) {
      console.error('User ID not found');
      return;
    }
  
    const userId = Number(storedUserId); // Convert to number
  
    if (isNaN(userId)) {
      console.error('Invalid user ID:', storedUserId);
      return;
    }
  
    this.timesheetService.getUserTimesheets(userId).subscribe(
      (response) => {
        console.log('User Timesheets:', response);
        this.timesheetData = response; // Store fetched data
      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }
  
  
  submitTimesheet() {
    if (!this.userId || !this.selectedDeliverable || !this.taskDescription || this.selectedHours === undefined || this.selectedMinutes === undefined) {
      console.error('Missing required fields');
      return;
    }

    const timesheetData = {
      user_id: this.userId,
      pd_id: this.selectedDeliverable,
      task_description: this.taskDescription,
      hours: this.selectedHours,
      minutes: this.selectedMinutes,
      task_status: this.selectedTaskStatus
    };

    this.timesheetService.submitTimesheet(timesheetData).subscribe({
      next: (response) => console.log('Timesheet Submitted:', response),
      error: (error) => console.error('Error submitting timesheet:', error)
    });
  }

  deleteTimesheet(timesheet_id:number){
    
  }


  onCustomerChange() {
    console.log('Selected Customer:', this.selectedCustomer);

    // Convert to number if necessary
    const customerId = Number(this.selectedCustomer);

    // Filter projects based on selected customer
    this.filterOptionProjects = this.optionProjects.filter(
      (project) => project.customer_id === customerId
    );

    this.selectedProject = null; // ✅ Fix: Set to null instead of empty string
    this.selectedDeliverable = null; // ✅ Fix: Set to null instead of empty string
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



  currentDate: Date = new Date();
  hoursList = Array.from({ length: 24 }, (_, i) => i);
  minutesList = [0, 15, 30, 45];
  taskStatusList = [
    { value: 0, label: 'In Progress' },
    { value: 1, label: 'Completed' }
  ];

  selectedTaskStatus = 0; // Default selection

  
  copyLastEntry() {
    console.log('Last entry copied');
  }

}
