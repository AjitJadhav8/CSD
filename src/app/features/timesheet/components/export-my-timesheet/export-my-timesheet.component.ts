import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import * as XLSX from 'xlsx'; // Import SheetJS
import { saveAs } from 'file-saver';
import { DataService } from '../../../../services/data-service/data.service';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-export-my-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './export-my-timesheet.component.html',
  styleUrl: './export-my-timesheet.component.css'
})
export class ExportMyTimesheetComponent {

  constructor(private timesheetService: TimesheetService, private dataService: DataService) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('user_id');
    console.log(storedUserId);
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchFullTimesheets();
      this.fetchOptions();
      

    } else {
      console.error('User ID not found in local storage.');
    }
  }

  userId: number | null = null;
  fullTimesheetData: any[] = [];
  fromDate: string = '';
  toDate: string = '';
  filteredTimesheetData: any[] = [];

  displayedTimesheetData: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 50;
  maxPageButtons: number = 5;

  timesheetDateFilter: string = '';
  customerFilter: number | null = null;
  projectFilter: number | null = null;
  projectDeliverableFilter: number | null = null;
  taskStatusFilter: number | null = null;
  projectManagerFilter: number | null = null;
  phasesFilter: number | null = null;

  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  optionProjectDeliverables: any[] = [];
  optionProjectManagers: any[] = [];
  optionPhases: any[] = [];

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionProjectDeliverables = response.projectDeliverables;
        this.optionProjectManagers = response.projectManagers;
        this.optionPhases = response.phases;
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }


  updateDisplayedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedTimesheetData = this.filteredTimesheetData.slice(startIndex, endIndex);
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updateDisplayedData();
    }
  }


  totalPages(): number {
    return Math.ceil(this.filteredTimesheetData.length / this.itemsPerPage);
  }

  getVisiblePageNumbers(): number[] {
    const totalPages = this.totalPages();
    const halfRange = Math.floor(this.maxPageButtons / 2);

    let startPage = Math.max(1, this.currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + this.maxPageButtons - 1);

    if (endPage - startPage + 1 < this.maxPageButtons) {
      startPage = Math.max(1, endPage - this.maxPageButtons + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }


  exportToExcel(): void {
    if (this.filteredTimesheetData.length === 0) {
      alert('No data available for the selected date range.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      this.filteredTimesheetData.map((item, index) => ({
        'S.No.': index + 1,
        'Project Deliverable': item.project_deliverable_name,
        'Project Name': item.project_name,
        'Customer Name': item.customer_name,
        'Phase': item.project_phase_name,
        'Task Description': item.task_description,
        'Hours': item.hours,
        'Minutes': item.minutes,
        'Task Status': item.task_status === 0 ? 'In Progress' : 'Completed',
        'Date': new Date(item.timesheet_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timesheet Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'TimesheetData.xlsx');
  }

  fetchFullTimesheets(): void {
    if (!this.userId) {
      console.error('User ID not available');
      return;
    }

    this.timesheetService.getUserFullTimesheet(this.userId).subscribe(
      (response) => {
        // Map the response to include the expected properties
        this.fullTimesheetData = response.map((item: any) => ({
          ...item,
          // Map whatever properties you have to the expected ones
          customer_id: item.customer_id || item.customer?.customer_id,
          customer_name: item.customer_name || item.customer?.customer_name,
          project_id: item.project_id || item.project?.project_id,
          project_name: item.project_name || item.project?.project_name,
          project_manager_id: item.project_manager_id || item.project_manager?.user_id,
          project_manager_name: item.project_manager_name ||
            (item.project_manager ? `${item.project_manager.user_first_name} ${item.project_manager.user_last_name}` : ''),
          phase_id: item.phase_id || item.project_phase?.phase_id,
          project_phase_name: item.project_phase_name || item.project_phase?.project_phase_name,
          pd_id: item.pd_id || item.project_deliverable?.pd_id,
          project_deliverable_name: item.project_deliverable_name || item.project_deliverable?.project_deliverable_name,
        }));

        console.log('Mapped timesheet data:', this.fullTimesheetData);

        this.filteredTimesheetData = [...this.fullTimesheetData];
        this.updateDisplayedData();
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching full timesheets:', error);
      }
    );
  }

  // Date formatting function
  formatDateForComparison(dateString: string): string {
    if (!dateString) return '';

    // Parse the date as UTC and format as YYYY-MM-DD
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';

    // Convert UTC date to local timezone correctly
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    // Format as YYYY-MM-DD
    return localDate.toISOString().split('T')[0];
  }


  applyFilters(): void {
    this.filteredTimesheetData = this.fullTimesheetData.filter((timesheet) => {
      // Convert all filter values to strings for consistent comparison
      const tsCustomerId = timesheet.customer_id?.toString();
      const tsProjectId = timesheet.project_id?.toString();
      const tsPdId = timesheet.pd_id?.toString();
      const tsPhaseId = timesheet.phase_id?.toString();
      const tsManagerId = timesheet.project_manager_id?.toString();
      
      return (
        (!this.timesheetDateFilter ||
          this.formatDate(timesheet.timesheet_date) === this.formatDateForComparison(this.timesheetDateFilter)) &&
        (!this.customerFilter || tsCustomerId === this.customerFilter?.toString()) &&
        (!this.projectFilter || tsProjectId === this.projectFilter?.toString()) &&
        (!this.projectDeliverableFilter || tsPdId === this.projectDeliverableFilter?.toString()) &&
        (!this.phasesFilter || tsPhaseId === this.phasesFilter?.toString()) &&
        (this.taskStatusFilter === null || this.taskStatusFilter === undefined || 
         timesheet.task_status === Number(this.taskStatusFilter)) &&
        (!this.projectManagerFilter || tsManagerId === this.projectManagerFilter?.toString())
      );
    });
    
    this.currentPage = 1;
    this.updateDisplayedData();
  }
  

  applyDateFilter(): void {
    this.filteredTimesheetData = this.fullTimesheetData.filter(item => {
      const itemDate = new Date(item.timesheet_date);

      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);

      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);

      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });

    this.currentPage = 1;
    this.updateDisplayedData();
  }
  clearDateFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.filteredTimesheetData = [...this.fullTimesheetData];
    this.currentPage = 1;
    this.updateDisplayedData();
  }


  // Clear Filters
  clearFilters(): void {
    this.customerFilter = null;
    this.projectFilter = null;
    this.projectDeliverableFilter = null;
    this.phasesFilter = null;
    this.projectManagerFilter = null;
    this.timesheetDateFilter = '';
    this.taskStatusFilter = null;
    this.fromDate = '';
    this.toDate = '';
    
    this.filteredTimesheetData = [...this.fullTimesheetData];
    this.currentPage = 1;
    this.updateDisplayedData();
  }
  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }

}
