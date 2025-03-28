import { Component } from '@angular/core';
import { RmgService } from '../../../../services/rmg-service/rmg.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';
import * as XLSX from 'xlsx'; // Import SheetJS
import { saveAs } from 'file-saver';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-all-teams-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule,NgSelectModule],
  templateUrl: './all-teams-timesheet.component.html',
  styleUrl: './all-teams-timesheet.component.css'
})
export class AllTeamsTimesheetComponent {

  constructor(private dataService: DataService, private rmgService: RmgService) { }

  ngOnInit(): void {
    this.fetchTimesheets();
    this.fetchOptions();

  }

  timesheets: any[] = [];
  filteredTimesheets: any[] = [];
  paginatedTimesheets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;

   // Filters
   timesheetDateFilter: string = '';
   userNameFilter: string = '';
   customerFilter: string = '';
   projectFilter: string = '';
   projectDeliverableFilter: string = '';
   taskStatusFilter: number | null = null; 
   projectManagerFilter: string = '';
   phasesFilter: string = '';

 
 
   // Options for filters
   optionUsers: any[] = [];
   optionCustomers: any[] = [];
   optionProjects: any[] = [];
   optionProjectDeliverables: any[] = [];
   optionProjectManagers: any[] = [];
   optionPhases: any[] = [];


 
   fetchTimesheets(): void {
    this.rmgService.getAllTimesheets().subscribe(
      (response) => {
        this.timesheets = response;
        this.filteredTimesheets = [...this.timesheets];
        this.updatePage();
        this.applyDateFilter(); // Apply filters after fetching data

      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionUsers = response.users;
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionProjectDeliverables = response.projectDeliverables;
        this.optionProjectManagers = response.projectManagers; // Add this line
        this.optionPhases = response.phases; // Add this line

        
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';
  
    // Convert UTC date to local timezone correctly
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  
    // Format as YYYY-MM-DD
    return localDate.toISOString().split('T')[0];
  }
  

    // Apply Filters
    applyFilters(): void {
      this.filteredTimesheets = this.timesheets.filter((timesheet) => {
        return (
          // (!this.timesheetDateFilter || timesheet.timesheet_date === this.timesheetDateFilter) &&
          // (!this.userNameFilter || timesheet.user_id?.toString() === this.userNameFilter.toString()) &&
          // (!this.customerFilter || timesheet.customer_id?.toString() === this.customerFilter.toString()) &&
          // (!this.projectFilter || timesheet.project_id?.toString() === this.projectFilter.toString()) &&
          // (!this.projectDeliverableFilter || timesheet.pd_id?.toString() === this.projectDeliverableFilter.toString()) &&
          // (!this.phasesFilter || timesheet.phase_id?.toString() === this.phasesFilter.toString()) &&

          // (!this.taskStatusFilter || timesheet.task_status?.toString() === this.taskStatusFilter.toString())&&
          // (!this.projectManagerFilter || timesheet.project_manager_id?.toString() === this.projectManagerFilter.toString())
          (!this.timesheetDateFilter || 
            this.formatDate(timesheet.timesheet_date) === this.timesheetDateFilter) &&
          (!this.userNameFilter || timesheet.user_id == this.userNameFilter) &&
          (!this.customerFilter || timesheet.customer_id == this.customerFilter) &&
          (!this.projectFilter || timesheet.project_id == this.projectFilter) &&
          (!this.projectDeliverableFilter || timesheet.pd_id == this.projectDeliverableFilter) &&
          (!this.phasesFilter || timesheet.phase_id == this.phasesFilter) &&
          (this.taskStatusFilter !== null ? timesheet.task_status === this.taskStatusFilter : true) &&
          (!this.projectManagerFilter || timesheet.project_manager_id == this.projectManagerFilter)
        );
      });
      this.currentPage = 1;
      this.updatePage();
    }
  

  
  // Clear Filters
    // Clear Filters
    clearFilters(): void {
      this.timesheetDateFilter = '';
      this.userNameFilter = '';
      this.customerFilter = '';
      this.projectFilter = '';
      this.projectDeliverableFilter = '';
      this.taskStatusFilter = null;
      this.phasesFilter ='';
      this.applyFilters();
    }

    clearFilter(filterName: string): void {
      (this as any)[filterName] = '';
      this.applyFilters();
    }
  

  

   // Pagination
   updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTimesheets = this.filteredTimesheets.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTimesheets.length / this.itemsPerPage);
  }


  getVisiblePageNumbers(): number[] {
    const totalPages = this.totalPages;
    const halfRange = Math.floor(this.maxPageButtons / 2);

    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);

    if (endPage - startPage + 1 < this.maxPageButtons) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

   // Date Range Filters
   fromDate: string = '';
   toDate: string = '';
  // Apply Date Filter
  applyDateFilter(): void {
    this.filteredTimesheets = this.timesheets.filter(item => {
      const itemDate = new Date(item.timesheet_date);

      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);

      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);

      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });

    this.currentPage = 1; // Reset to first page after filtering
    this.updatePage();
  }
  clearDateFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.filteredTimesheets = [...this.timesheets]; // Reset to original data
    this.currentPage = 1;
    this.updatePage();
  }
  
    // Export to Excel
    exportToExcel(): void {
      if (this.filteredTimesheets.length === 0) {
        alert('No data available for the selected date range.');
        return;
      }
  
      const worksheet = XLSX.utils.json_to_sheet(
        this.filteredTimesheets.map((item, index) => ({
          'S.No.': index + 1,
          'Customer Name': item.customer_name,
          'Project Name': item.project_name,
          'Employee Name': item.user_name,
          'Project Manager': item.project_manager_name,
          'Project Phase': item.project_phase_name,
          'Project Deliverable': item.project_deliverable_name,
          'Timesheet Date': new Date(item.timesheet_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          'Task Description': item.task_description,
          'Hours': item.hours,
          'Minutes': item.minutes,
          'Task Status': item.task_status ? 'Completed' : 'Pending',
        }))
      );
  
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet Data');
  
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
      saveAs(data, 'AllTeamsTimesheetData.xlsx');
    }

}
