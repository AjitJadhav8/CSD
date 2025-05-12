import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import Swal from 'sweetalert2';
import { NgSelectModule } from '@ng-select/ng-select';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';


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

  constructor(private dataService: DataService, private http: HttpClient, private timesheetService: TimesheetService, private secureStorage: SecureStorageService) { }
  ngOnInit(): void {
    // Fetch user ID from localStorage
    const storedUserId = this.secureStorage.getItem('user_id');
    console.log('Stored User ID:', storedUserId);
    if (storedUserId) {
      this.userId = Number(storedUserId);
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
    this.initializeBackdateSystem();

    this.dataService.getOptions().subscribe(
      (response) => {
        console.log('Fetched Data:', response);
        this.optionProjectDeliverables = response.projectDeliverables;
        this.optionPhases = response.phases
      },
      (error) => {
        console.error('Error fetching roles and departments', error);
      }
    );
  }



  approvedBackdates: any[] = [];
  activeApprovedBackdates: any[] = [];
  pendingBackdateRequests: any[] = [];
  backdateRequestValidityDays = 3;
  maxBackdateDays = 90; // Maximum 90 days in past


  // Backdate Request Methods
  initializeBackdateSystem(): void {
    this.loadApprovedBackdates();
    // Check for expired approvals daily
    setInterval(() => this.updateActiveApprovedBackdates(), 24 * 60 * 60 * 1000);
  }

  loadApprovedBackdates(): void {
    if (!this.userId) return;

    this.timesheetService.getApprovedBackdates(this.userId).subscribe({
      next: (backdates) => {
        this.approvedBackdates = backdates;
        this.updateActiveApprovedBackdates();
      },
      error: (error) => {
        console.error('Error loading approved backdates:', error);
      }
    });
  }

  updateActiveApprovedBackdates(): void {
    const today = new Date();
    this.activeApprovedBackdates = this.approvedBackdates.filter(backdate => {
      const validUntil = new Date(backdate.valid_until);
      return validUntil >= today;
    });
  }

  isDateApproved(date: string): boolean {
    if (!date) return false;

    const dateObj = new Date(date);
    const today = new Date();

    // Check if there's any active approval that covers today
    const hasActiveApproval = this.activeApprovedBackdates.some(backdate =>
      new Date(backdate.valid_until) >= today
    );

    // If there's an active approval, allow any date within 90 days
    if (hasActiveApproval) {
      const minDate = new Date();
      minDate.setDate(today.getDate() - 90);
      return dateObj >= minDate && dateObj <= today;
    }

    return false;
  }

  hasApprovedBackdates(): boolean {
    return this.activeApprovedBackdates.length > 0;
  }

  showRequestBackdateButton(): boolean {
    if (!this.selectedDate) return false;

    const selectedDate = new Date(this.selectedDate);
    const today = new Date();
    const defaultMinDate = new Date(new Date().setDate(today.getDate() - 7));

    return selectedDate < defaultMinDate &&
      !this.isDateApproved(this.selectedDate);
  }

  hasPendingRequestForDate(date: string): boolean {
    return false; // Always return false to bypass the check
  }

  getMinDate(): string {
    const today = new Date();
    const defaultMinDate = new Date(new Date().setDate(today.getDate() - 7));

    // If there are approved backdates that are still valid
    if (this.activeApprovedBackdates.length > 0) {
      const today = new Date();
      const validApprovalExists = this.activeApprovedBackdates.some(backdate =>
        new Date(backdate.valid_until) >= today
      );

      if (validApprovalExists) {
        const maxAllowedDate = new Date();
        maxAllowedDate.setDate(today.getDate() - 90);
        return maxAllowedDate.toISOString().split('T')[0];
      }
    }

    return defaultMinDate.toISOString().split('T')[0];
  }

  openBackdateRequestModal(): void {
    const today = new Date().toISOString().split('T')[0];
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 90);

    Swal.fire({
      title: 'Request Backdate Access',
      html: `
      <div class="text-left">
        <div class="mb-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Requesting access to fill past timesheets</label>
          <div class="text-xs p-2 bg-gray-100 rounded">
            <p>You're requesting access to fill timesheets for dates up to 90 days in the past.</p>
            <p class="mt-1">If approved, you'll have 3 days to submit your past timesheets.</p>
          </div>
        </div>
        
        <div class="mb-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Request Date</label>
          <input type="text" 
            class="text-xs w-full px-2 py-1 border border-gray-300 rounded bg-gray-100"
            value="${today}" readonly>
        </div>
        
        <div class="mb-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Customer*</label>
          <select id="backdateCustomer" class="text-xs w-full px-2 py-1 border border-gray-300 rounded">
            <option value="">Select Customer</option>
            ${this.optionCustomers.map(c => `<option value="${c.customer_id}">${c.customer_name}</option>`).join('')}
          </select>
        </div>
        
        <div class="mb-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Project*</label>
          <select id="backdateProject" class="text-xs w-full px-2 py-1 border border-gray-300 rounded">
            <option value="">Select Project</option>
          </select>
        </div>
        
        <div class="mb-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Reason*</label>
          <textarea id="backdateReason" class="text-xs w-full px-2 py-1 border border-gray-300 rounded" 
            placeholder="Explain why you need to fill past timesheets..."></textarea>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Submit Request',
      cancelButtonText: 'Cancel',
      didOpen: () => {
        // Handle project dropdown based on customer selection
        const customerSelect = document.getElementById('backdateCustomer') as HTMLSelectElement;
        const projectSelect = document.getElementById('backdateProject') as HTMLSelectElement;

        customerSelect.addEventListener('change', () => {
          const customerId = customerSelect.value;
          projectSelect.innerHTML = '<option value="">Select Project</option>';

          if (customerId) {
            const projects = this.optionProjects.filter(p => p.customer_id == customerId);
            projects.forEach(p => {
              projectSelect.innerHTML += `<option value="${p.project_id}">${p.project_name}</option>`;
            });
          }
        });
      },
      preConfirm: () => {
        const customerSelect = document.getElementById('backdateCustomer') as HTMLSelectElement;
        const projectSelect = document.getElementById('backdateProject') as HTMLSelectElement;
        const reasonInput = document.getElementById('backdateReason') as HTMLTextAreaElement;

        if (!customerSelect.value || !projectSelect.value || !reasonInput.value) {
          Swal.showValidationMessage('Please fill all required fields');
          return false;
        }

        return {
          customerId: customerSelect.value,
          projectId: projectSelect.value,
          reason: reasonInput.value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitBackdateRequest(result.value.reason, result.value.projectId);
      }
    });
  }

  // getMinBackdateDate(): string {
  //   const today = new Date();
  //   const maxAllowedDate = new Date();
  //   maxAllowedDate.setDate(today.getDate() - this.maxBackdateDays);
  //   return maxAllowedDate.toISOString().split('T')[0];
  // }

  // getMaxBackdateDate(): string {
  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(today.getDate() - 1);
  //   return yesterday.toISOString().split('T')[0];
  // }

  submitBackdateRequest(reason: string, projectId: string): void {
    if (!this.userId) return;

    const requestData = {
        user_id: this.userId,
        project_id: projectId,
        reason: reason,
        status: 'pending'
    };

    this.timesheetService.submitBackdateRequest(requestData).subscribe({
        next: (response) => {
            this.pendingBackdateRequests.push({
                id: response.request_id,
                status: 'pending'
            });

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Backdate request submitted!',
                text: 'Your manager will review your request',
                showConfirmButton: false,
                timer: 3000
            });
        },
        error: (error) => {
            console.error('Error submitting backdate request:', error);
            
            if (error.error?.error === 'Duplicate request') {
                // Show specific message for duplicate requests
                Swal.fire({
                    icon: 'warning',
                    title: 'Duplicate Request',
                    html: `
                        <div class="text-left">
                            <p>${error.error.message}</p>
                            ${error.error.existingRequest.status === 'approved' ? 
                                `<p class="mt-2"><strong>Approval Details:</strong></p>
                                 <ul class="list-disc pl-5">
                                    <li>Project: ${error.error.existingRequest.project_name}</li>
                                    <li>Manager: ${error.error.existingRequest.manager_name || 'Not specified'}</li>
                                    <li>Valid Until: ${error.error.existingRequest.formatted_valid_until}</li>
                                 </ul>` 
                                : ''}
                        </div>
                    `,
                });
            } else {
                Swal.fire('Error', 'Failed to submit request', 'error');
            }
        }
    });
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
        this.calculateTotalTime();

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
        this.calculateTotalTime();
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





  retainTimesheetEntry(timesheet: any): void {
    console.log('Retaining Timesheet Entry:', timesheet);

    // Set the form values based on the selected timesheet
    this.selectedDate = this.formatDate(timesheet.timesheet_date);
    this.selectedCustomer = timesheet.customer_id;

    // Trigger customer change to load projects
    this.onCustomerChange();

    // Set project after a small delay to ensure projects are loaded
    setTimeout(() => {
      this.selectedProject = timesheet.project_id;

      // Trigger project change to load deliverables
      this.onProjectChange();

      setTimeout(() => {
        this.selectedDeliverable = timesheet.pd_id;

        // Trigger deliverable change to load phases
        this.onDeliverableChange();

        setTimeout(() => {
          this.selectedPhase = timesheet.phase_id;
          this.selectedHours = timesheet.hours;
          this.selectedMinutes = timesheet.minutes;
          this.selectedTaskStatus = timesheet.task_status;
          this.taskDescription = timesheet.task_description;

          // Scroll to the form for better UX
          const formElement = document.querySelector('.p-4');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }, 100);
    }, 100);

    // Show success message
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Timesheet entry retained!',
      showConfirmButton: false,
      timer: 2000
    });
  }

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

  updateTimesheet(form: NgForm): void {
    // Check form validity and required fields
    if (!form.valid) {
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

    if (!this.editTimesheetId || !this.userId) {
      console.error('Timesheet ID or User ID not found');
      return;
    }

    // Validate task status is set (0 or 1)
    if (this.editSelectedTaskStatus === null || this.editSelectedTaskStatus === undefined) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: 'Please set task status!',
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
            this.calculateTotalTime();


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

  // Add these methods to your component
  private checkDailyLimit(newHours: number, newMinutes: number): { valid: boolean, message?: string } {
    const currentTotal = this.calculateTotalHours();
    const newEntryHours = newHours + (newMinutes / 60);
    const projectedTotal = currentTotal + newEntryHours;

    if (projectedTotal > 24) {
      return {
        valid: false,
        message: `Total time would exceed 24 hours for this day (currently ${currentTotal.toFixed(2)}h)`
      };
    }
    return { valid: true };
  }

  calculateTotalTime(): { hours: number, minutes: number } {
    if (!this.timesheetData || this.timesheetData.length === 0) {
      return { hours: 0, minutes: 0 };
    }

    let totalMinutes = 0;

    this.timesheetData.forEach((entry: any) => {
      totalMinutes += (entry.hours * 60) + entry.minutes;
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return { hours, minutes };
  }
  getHoursStatusText(): string {
    const total = this.calculateTotalHours();
    if (total < 6) {
      return 'Below minimum (6h)';
    } else if (total >= 6 && total <= 8) {
      return 'Standard workday';
    } else {
      return 'Overtime';
    }
  }
  // Add this method to your component
  calculateTotalHours(): number {
    const totalTime = this.calculateTotalTime();
    return totalTime.hours + (totalTime.minutes / 60);
  }

  getTaskStatusLabel(status: number): string {
    const statusObj = this.taskStatusList.find(s => s.value === status);
    return statusObj ? statusObj.label : 'Unknown';
  }

  clearTimesheetForm(form: NgForm) {
    // Reset form with default values
    const currentSelectedDate = this.selectedDate;

    // Reset form but keep the selected date
    form.resetForm({
      selectedDate: currentSelectedDate, // Keep the currently selected date
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

  // Total Hours Logic 

  // In component

}
