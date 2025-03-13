import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fill-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fill-timesheet.component.html',
  styleUrl: './fill-timesheet.component.css'
})
export class FillTimesheetComponent {
  userId: number | null = null; // Store user_id
  selectedDate: string = new Date().toISOString().split('T')[0]; // Default to today
  maxDate: string = new Date().toISOString().split('T')[0]; // Today's date
  minDate: string = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]; // 7 days before today




  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService) { }
  ngOnInit(): void {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem('user_id'); // Fetch user_id from local storage
    console.log('Stored User ID:', storedUserId);
    if (storedUserId) {
      this.userId = Number(storedUserId); // Convert to number
      console.log('User ID successfully set:', this.userId);
      this.timesheetService.getAssignedCustomersAndProjects(this.userId).subscribe(
        (response) => {
          console.log('Fetched Assigned Data:', response);
          this.optionCustomers = response.customers;
          this.optionProjects = response.projects;
        
        },
        (error) => {
          console.error('Error fetching assigned customers and projects:', error);
        }
      );
    } else {
      console.error('User ID not found in local storage. Ensure login process stores it.');
    }

    

    this.fetchTimesheets();


    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Fetched Data:', response);
        this.optionProjectDeliverables = response.projectDeliverables; // Keep all deliverables intact
        this.optionTaskCategories = response.taskCategories;
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }

  selectedCustomer: number | string = '';
  selectedProject: number | null = null;
  selectedDeliverable: number | null = null;
  selectedHours: number | null = null;
  selectedMinutes: number | null = null;
  selectedTaskCategory: any;
  taskDescription: string = '';
  timesheetData: any;

  fetchTimesheets(): void {
    if (!this.userId) {
      console.error('User ID not found');
      return;
    }

    this.timesheetService.getUserTimesheets(this.userId).subscribe(
      (response) => {
        console.log('User Timesheets Updated:', response);
        this.timesheetData = response; // Update the table data
      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }
  getTaskStatusLabel(status: number): string {
    const statusObj = this.taskStatusList.find(s => s.value === status);
    return statusObj ? statusObj.label : 'Unknown';
  }


  submitTimesheet() {
    if (!this.userId || !this.selectedDeliverable || !this.selectedTaskCategory || !this.taskDescription || this.selectedHours === undefined || this.selectedMinutes === undefined) {
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

    const timesheetData = {
      timesheet_date: this.selectedDate, // Directly sending selected date
      user_id: this.userId,
      pd_id: this.selectedDeliverable,
      task_description: this.taskDescription,
      hours: this.selectedHours,
      minutes: this.selectedMinutes,
      task_status: this.selectedTaskStatus,
      task_cat_id: this.selectedTaskCategory // New field added
    };

    this.timesheetService.submitTimesheet(timesheetData).subscribe({
      next: (response) => {
        console.log('Timesheet Submitted:', response);
        this.clearTimesheetForm();
        // Success Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Timesheet submitted successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        
        setTimeout(() => this.fetchTimesheets(), 100);
      },
      error: (error) => {
        console.error('Error submitting timesheet:', error);

        // Error Toast Notification
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Failed to submit timesheet!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }


  deleteTimesheet(timesheet_id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This timesheet entry will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.timesheetService.deleteTimesheet(timesheet_id).subscribe({
          next: () => {
            console.log('Timesheet Deleted');

            this.fetchTimesheets(); // Fetch updated timesheets

            // Success Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Timesheet deleted successfully!',
              showConfirmButton: false,
              timer: 3000
            });
          },
          error: (error) => {
            console.error('Error deleting timesheet:', error);

            // Error Toast Notification
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'error',
              title: 'Failed to delete timesheet!',
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
      }
    });
  }

  clearTimesheetForm() {
    this.selectedCustomer = '';
    this.selectedProject = null;
    this.selectedDeliverable = null;
    this.selectedHours = null;
    this.selectedMinutes = null;
    this.selectedTaskCategory = null;
    this.taskDescription = '';
  }


  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filterOptionProjects: any[] = [];  // Stores filtered projects based on selected customer
  optionProjectDeliverables: any[] = [];
  filterOptionProjectDeliverables: any[] = [];
  optionTaskCategories: any[] = [];

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

  // currentDate: Date = new Date();
  hoursList = Array.from({ length: 8 }, (_, i) => i + 1);
  minutesList = [15, 30, 45];
  taskStatusList = [
    { value: 0, label: 'In Progress' },
    { value: 1, label: 'Completed' }
  ];

  selectedTaskStatus: number = 0; // Default to "In Progress"

  toggleTaskStatus() {
    this.selectedTaskStatus = this.selectedTaskStatus === 1 ? 0 : 1;
  }
  
}
