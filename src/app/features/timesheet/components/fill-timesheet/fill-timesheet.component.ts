import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-fill-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
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

    this.fetchTimesheets(this.selectedDate);

    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Fetched Data:', response);
        this.optionProjectDeliverables = response.projectDeliverables; // Keep all deliverables intact
        this.optionPhases = response.phases
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }

  // Edit modal properties
  isEditModalOpen = false;
  editTimesheetId: number | null = null;
  editSelectedDate: string = '';
  editSelectedCustomer: number | string = '';
  editSelectedProject: number | null = null;
  editSelectedPhase: number | null = null;
  editSelectedDeliverable: number | null = null;
  editSelectedHours: number | null = null;
  editSelectedMinutes: number = 0;
  editSelectedTaskStatus: number = 0;
  editTaskDescription: string = '';


  // Open Edit Modal
  openEditModal(timesheet: any): void {
    console.log('Editing Timesheet:', timesheet);
    this.editTimesheetId = timesheet.timesheet_id;
    this.editSelectedDate = this.formatDate(timesheet.timesheet_date);
    this.editSelectedCustomer = timesheet.customer_id;
    this.editSelectedProject = timesheet.project_id;
    this.editSelectedDeliverable = timesheet.pd_id;
    this.editSelectedPhase = timesheet.phase_id;
    this.editSelectedHours = timesheet.hours;
    this.editSelectedMinutes = timesheet.minutes;
    this.editSelectedTaskStatus = timesheet.task_status;
    this.editTaskDescription = timesheet.task_description;

    // Initialize filtered lists based on the selected values
    if (this.editSelectedCustomer) {
      this.filterOptionProjects = this.optionProjects.filter(
        (project: any) => project.customer_id == this.editSelectedCustomer
      );
    }

    if (this.editSelectedProject) {
      // Filter deliverables by project (not customer)
      this.filterOptionProjectDeliverables = this.optionProjectDeliverables.filter(
        (deliverable: any) => deliverable.project_id == this.editSelectedProject
      );
    }

    if (this.editSelectedDeliverable) {
      // Filter phases by deliverable (not project)
      this.filterOptionPhases = this.optionPhases.filter(
        (phase: any) => phase.pd_id == this.editSelectedDeliverable
      );
    }

    this.isEditModalOpen = true;
  }
  // Close Edit Modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editTimesheetId = null;
    this.editSelectedDate = '';
    this.editSelectedCustomer = '';
    this.editSelectedProject = null;
    this.editSelectedPhase = null;
    this.editSelectedDeliverable = null;
    this.editSelectedHours = null;
    this.editSelectedMinutes = 0;
    this.editSelectedTaskStatus = 0;
    this.editTaskDescription = '';
  }

  onEditDeliverableChange(): void {
    if (this.editSelectedDeliverable) {
      // Filter phases by selected deliverable
      this.filterOptionPhases = this.optionPhases.filter(
        (phase: any) => phase.pd_id == this.editSelectedDeliverable
      );
      // Try to maintain current phase selection if valid
      if (this.editSelectedPhase) {
        const phaseStillValid = this.filterOptionPhases.some(
          (p: any) => p.phase_id == this.editSelectedPhase
        );
        if (!phaseStillValid) {
          this.editSelectedPhase = null;
        }
      }
    } else {
      this.filterOptionPhases = [];
      this.editSelectedPhase = null;
    }
  }

  // Change handlers for edit modal
  onEditCustomerChange(): void {
    if (this.editSelectedCustomer) {
      this.filterOptionProjects = this.optionProjects.filter(
        (project: any) => project.customer_id == this.editSelectedCustomer
      );
      // Reset dependent fields
      this.editSelectedProject = null;
      this.editSelectedDeliverable = null;
      this.editSelectedPhase = null;
      this.filterOptionProjectDeliverables = [];
      this.filterOptionPhases = [];
    } else {
      this.filterOptionProjects = [];
      this.editSelectedProject = null;
      this.editSelectedDeliverable = null;
      this.editSelectedPhase = null;
    }
  }

  // Update Timesheet
  updateTimesheet(form: NgForm): void {
    if (!form.valid || !this.editTimesheetId) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all required fields correctly!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    const timesheetData = {
      timesheet_date: this.editSelectedDate,
      user_id: this.userId,
      pd_id: this.editSelectedDeliverable,
      phase_id: this.editSelectedPhase,
      hours: this.editSelectedHours,
      minutes: this.editSelectedMinutes,
      task_status: this.editSelectedTaskStatus,
      task_description: this.editTaskDescription,
    };

    this.timesheetService.updateTimesheet(this.editTimesheetId, timesheetData).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Timesheet updated successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchTimesheets(this.editSelectedDate);
        this.closeEditModal();
      },
      error: (error) => {
        console.error('Error updating timesheet:', error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Failed to update timesheet!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  onEditProjectChange(): void {
    if (this.editSelectedProject) {
      // Filter deliverables by selected project
      this.filterOptionProjectDeliverables = this.optionProjectDeliverables.filter(
        (deliverable: any) => deliverable.project_id == this.editSelectedProject
      );
      // Reset dependent fields
      this.editSelectedDeliverable = null;
      this.editSelectedPhase = null;
      this.filterOptionPhases = [];
    } else {
      this.filterOptionProjectDeliverables = [];
      this.editSelectedDeliverable = null;
      this.editSelectedPhase = null;
    }
  }

  onEditTaskStatusChange(status: number): void {
    this.editSelectedTaskStatus = status ? 1 : 0;
  }
  isTimesheetEditable(timesheetDate: string): boolean {
    if (!timesheetDate) return false;

    // Parse the timesheet date
    const timesheetDateTime = new Date(timesheetDate).getTime();
    const now = new Date().getTime();

    // Calculate the difference in hours
    const hoursDifference = (now - timesheetDateTime) / (1000 * 60 * 60);

    // Allow editing if within 24 hours
    return hoursDifference <= 24;
  }

  // Helper method to format date
  formatDate(dateString: string): string {
    if (!dateString) return '';

    // Convert UTC date to local timezone correctly
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    // Format as YYYY-MM-DD
    return localDate.toISOString().split('T')[0];
  }

  selectedPhase: number | null = null;
  filterOptionPhases: any[] = [];
  selectedCustomer: number | string = '';
  selectedProject: number | null = null;
  selectedDeliverable: number | null = null;
  selectedHours: number | null = null;
  selectedMinutes: number = 0;     // Default to 0 minutes
  selectedTaskCategory: any;
  taskDescription: string = '';
  timesheetData: any;

  onDateChange(): void {
    if (this.selectedDate) {
      this.fetchTimesheets(this.selectedDate);
    }
  }

  fetchTimesheets(date?: string): void {
    if (!this.userId) {
      console.error('User ID not found fetch');
      return;
    }

    const fetchDate = date || this.selectedDate;

    this.timesheetService.getUserTimesheets(this.userId, fetchDate).subscribe(
      (response) => {
        console.log('User Timesheets Updated:', response);
        this.timesheetData = response; // Update the table data
      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }

  submitTimesheet(timesheetForm: NgForm) {  // Add NgForm parameter
    if (!timesheetForm.valid) {
      console.error('Form is invalid');
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all required fields!',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }

    if (!this.userId) {
      console.error('User ID not found');
      return;
    }

    const timesheetData = {
      timesheet_date: this.selectedDate,
      user_id: this.userId,
      pd_id: this.selectedDeliverable,
      phase_id: this.selectedPhase,
      hours: this.selectedHours,
      minutes: this.selectedMinutes,
      task_status: this.selectedTaskStatus,
      task_description: this.taskDescription,
    };

    this.timesheetService.submitTimesheet(timesheetData).subscribe({
      next: (response) => {
        console.log('Timesheet Submitted:', response);
        this.clearTimesheetForm(timesheetForm);  // Pass the form reference
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Timesheet submitted successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchTimesheets(this.selectedDate);
      },
      error: (error) => {
        console.error('Error submitting timesheet:', error);
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

            this.fetchTimesheets(this.selectedDate);

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

  getTaskStatusLabel(status: number): string {
    const statusObj = this.taskStatusList.find(s => s.value === status);
    return statusObj ? statusObj.label : 'Unknown';
  }

  clearTimesheetForm(form: NgForm) {
    // Reset form with default values
    form.resetForm({
      selectedDate: new Date().toISOString().split('T')[0], // Set to today's date
    });

    // Reset other variables if they are not bound to the form
    this.selectedCustomer = '';
    this.selectedProject = null;
    this.selectedPhase = null;
    this.selectedDeliverable = null;
    this.selectedHours = null;
    this.selectedMinutes = 0;
    this.taskDescription = '';
    this.selectedTaskStatus = 0;
  }


  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  filterOptionProjects: any[] = [];
  optionProjectDeliverables: any[] = [];
  filterOptionProjectDeliverables: any[] = [];
  optionTaskCategories: any[] = [];
  optionPhases: any[] = [];

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
    this.selectedPhase = null;
    this.filterOptionPhases = [];

  }

  onProjectChange() {
    console.log('Selected Project:', this.selectedProject);
    const projectId = Number(this.selectedProject);

    // Filter deliverables based on selected project
    this.filterOptionProjectDeliverables = this.optionProjectDeliverables.filter(
      (deliverable) => deliverable.project_id === projectId
    );

    // Reset dependent selections
    this.selectedDeliverable = null;
    this.selectedPhase = null;
    this.filterOptionPhases = [];
  }

  onDeliverableChange() {
    console.log('Selected Deliverable:', this.selectedDeliverable);
    const deliverableId = Number(this.selectedDeliverable);

    // Filter phases based on selected deliverable
    this.filterOptionPhases = this.optionPhases.filter(
      (phase) => phase.pd_id === deliverableId
    );

    // Reset phase selection
    this.selectedPhase = null;
  }

  // currentDate: Date = new Date();
  hoursList = Array.from({ length: 9 }, (_, i) => i);
  minutesList = [0, 15, 30, 45];
  taskStatusList = [
    { value: 0, label: 'In Progress' },
    { value: 1, label: 'Completed' }
  ];

  selectedTaskStatus: number = 0; // Default to "In Progress"
  toggleTaskStatus() {
    this.selectedTaskStatus = this.selectedTaskStatus === 1 ? 0 : 1;
  }

}
