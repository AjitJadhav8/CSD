import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-pm-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './pm-timesheet.component.html',
  styleUrl: './pm-timesheet.component.css'
})

export class PmTimesheetComponent implements OnInit {
  userId: number | null = null;
  selectedDate: string = new Date().toISOString().split('T')[0];
  maxDate: string = new Date().toISOString().split('T')[0];
  
  optionCustomers: any[] = [];
  filterOptionProjects: any[] = [];
  
  selectedCustomer: number | null = null;
  selectedProject: number | null = null;
  selectedHours: number | null = null;
  selectedMinutes: number = 0;
  description: string = '';
  
  timesheetData: any[] = [];
  hoursList = Array.from({ length: 9 }, (_, i) => i);
  minutesList = [0, 15, 30, 45];



    // Existing properties...
  isEditModalOpen = false;
  editTimesheetId: number | null = null;
  editSelectedDate: string = '';
  editSelectedCustomer: number | null = null;
  editSelectedProject: number | null = null;
  editSelectedHours: number | null = null;
  editSelectedMinutes: number = 0;
  editDescription: string = '';

   // Add this method to check if timesheet is editable
  isTimesheetEditable(timesheetDate: string): boolean {
    if (!timesheetDate) return false;
    
    const timesheetDateTime = new Date(timesheetDate).getTime();
    const now = new Date().getTime();
    const hoursDifference = (now - timesheetDateTime) / (1000 * 60 * 60);
    
    return hoursDifference <= 24;
  }

  // Add this method to copy timesheet entry
  retainTimesheetEntry(timesheet: any): void {
    console.log('Retaining Timesheet Entry:', timesheet);

    this.selectedDate = this.formatDate(timesheet.timesheet_date);
    this.selectedCustomer = timesheet.customer_id;

    // Trigger customer change to load projects
    this.onCustomerChange();

    setTimeout(() => {
      this.selectedProject = timesheet.project_id;
      this.selectedHours = timesheet.hours;
      this.selectedMinutes = timesheet.minutes;
      this.description = timesheet.description;

      // Scroll to the form for better UX
      const formElement = document.querySelector('.p-4');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    // Show success message
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Timesheet entry copied!',
      showConfirmButton: false,
      timer: 2000
    });
  }

  // Add this method to format date
  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  // Add this method to open edit modal
  openEditModal(timesheet: any): void {
    console.log('Editing Timesheet:', timesheet);
    this.editTimesheetId = timesheet.pm_timesheet_id;
    this.editSelectedDate = this.formatDate(timesheet.timesheet_date);
    this.editSelectedCustomer = timesheet.customer_id;
    this.editSelectedProject = timesheet.project_id;
    this.editSelectedHours = timesheet.hours;
    this.editSelectedMinutes = timesheet.minutes;
    this.editDescription = timesheet.description;

    // Initialize filtered projects based on selected customer
    if (this.editSelectedCustomer) {
      this.filterOptionProjects = this.optionCustomers
        .find(c => c.customer_id == this.editSelectedCustomer)?.projects || [];
    }

    this.isEditModalOpen = true;
  }

  // Add this method to close edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editTimesheetId = null;
    this.editSelectedDate = '';
    this.editSelectedCustomer = null;
    this.editSelectedProject = null;
    this.editSelectedHours = null;
    this.editSelectedMinutes = 0;
    this.editDescription = '';
  }

  // Add this method to update timesheet
  updateTimesheet(form: NgForm): void {
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

    const data = {
      timesheet_date: this.editSelectedDate,
      user_id: this.userId,
      customer_id: this.editSelectedCustomer,
      project_id: this.editSelectedProject,
      hours: this.editSelectedHours,
      minutes: this.editSelectedMinutes,
      description: this.editDescription
    };

    this.timesheetService.updatePmTimesheet(this.editTimesheetId, data).subscribe({
      next: () => {
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

  constructor(
    private timesheetService: TimesheetService,
    private secureStorage: SecureStorageService
  ) { }

  ngOnInit(): void {
    const storedUserId = this.secureStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchTimesheets();
      this.loadManagedProjects();
    }
  }

  loadManagedProjects(): void {
    if (!this.userId) return;
    
    this.timesheetService.getManagedProjects(this.userId).subscribe(
      (response) => {
        this.optionCustomers = response.customers;
      },
      (error) => {
        console.error('Error fetching managed projects:', error);
      }
    );
  }

  onCustomerChange(): void {
    if (!this.userId || !this.selectedCustomer) return;
    
    this.timesheetService.getManagedProjects(this.userId).subscribe(
      (response) => {
        this.filterOptionProjects = response.projects.filter(
          (p: any) => p.customer_id == this.selectedCustomer
        );
        this.selectedProject = null;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  fetchTimesheets(date?: string): void {
    if (!this.userId) return;
    
    this.timesheetService.getPmTimesheets(this.userId, date || this.selectedDate).subscribe(
      (response) => {
        this.timesheetData = response;
      },
      (error) => {
        console.error('Error fetching PM timesheets:', error);
      }
    );
  }

  submitTimesheet(form: NgForm): void {
    if (!form.valid || !this.userId || !this.selectedCustomer || !this.selectedProject) {
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

    const data = {
      timesheet_date: this.selectedDate,
      user_id: this.userId,
      customer_id: this.selectedCustomer,
      project_id: this.selectedProject,
      hours: this.selectedHours,
      minutes: this.selectedMinutes,
      description: this.description
    };

    this.timesheetService.submitPmTimesheet(data).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Timesheet submitted successfully!',
          showConfirmButton: false,
          timer: 3000
        });
        this.fetchTimesheets();
        form.resetForm();
        this.selectedHours = null;
        this.selectedMinutes = 0;
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

  deleteTimesheet(id: number): void {
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
        this.timesheetService.deletePmTimesheet(id).subscribe({
          next: () => {
            this.fetchTimesheets();
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

  calculateTotalTime(): { hours: number, minutes: number } {
    let totalMinutes = this.timesheetData.reduce((sum, entry) => sum + (entry.hours * 60) + entry.minutes, 0);
    return {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    };
  }
}