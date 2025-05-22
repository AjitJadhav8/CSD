import { Component } from '@angular/core';
import saveAs from 'file-saver';
import { ReportService } from '../../../../services/report-service/report.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx'; // Import SheetJS


@Component({
  selector: 'app-pm-timesheet-report',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule],
  templateUrl: './pm-timesheet-report.component.html',
  styleUrl: './pm-timesheet-report.component.css'
})
export class PmTimesheetReportComponent {
  timesheets: any[] = [];
  filteredTimesheets: any[] = [];
  paginatedTimesheets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;

  // Filters
  fromDate: string = '';
  toDate: string = '';
  customerFilter: number | null = null;
  projectFilter: number | null = null;
  timesheetDateFilter: string = '';
  projectManagerFilter: number | null = null;
  optionProjectManagers: any[] = [];

  // Options
  optionCustomers: any[] = [];
  optionProjects: any[] = [];

  constructor(
    private reportService: ReportService,

  ) { }

  ngOnInit(): void {
    this.fetchPmTimesheets();
    this.fetchOptions();
        this.fetchProjectManagers(); // Add this line

  }
  fetchProjectManagers(): void {
    this.reportService.getProjectManagers().subscribe(
      (response) => {
        this.optionProjectManagers = response;
      },
      (error) => {
        console.error('Error fetching project managers:', error);
      }
    );
  }
  fetchPmTimesheets(): void {
  this.reportService.getPmTimesheets().subscribe(
    (response) => {
      this.timesheets = response;
      this.filteredTimesheets = [...this.timesheets];
      this.updatePage();
      this.calculateFilteredTotalTime();
    },
    (error) => {
      console.error('Error fetching PM timesheets:', error);
    }
  );
}

fetchOptions(): void {
  // For customers and projects, you might want to fetch all or keep as is
  // depending on your requirements
  
  // Fetch all customers
  this.reportService.getAllCustomers().subscribe(
    (response) => {
      this.optionCustomers = response;
    },
    (error) => {
      console.error('Error fetching customers:', error);
    }
  );

  // Fetch all projects
  this.reportService.getAllProjects().subscribe(
    (response) => {
      this.optionProjects = response;
    },
    (error) => {
      console.error('Error fetching projects:', error);
    }
  );

  // Fetch all project managers
  this.fetchProjectManagers();
}

  applyFilters(): void {
    this.filteredTimesheets = this.timesheets.filter((timesheet) => {
      const itemDate = new Date(timesheet.timesheet_date);
      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);
      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);
      
      return (
        (!from || itemDate >= from) && 
        (!to || itemDate <= to) &&
        (!this.customerFilter || timesheet.customer_id == this.customerFilter) &&
        (!this.projectFilter || timesheet.project_id == this.projectFilter) &&
        (!this.projectManagerFilter || timesheet.project_manager_id == this.projectManagerFilter) &&
        (!this.timesheetDateFilter || this.formatDate(timesheet.timesheet_date) === this.timesheetDateFilter)
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }
  // Update clearFilters
  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.customerFilter = null;
    this.projectFilter = null;
    this.projectManagerFilter = null;
    this.timesheetDateFilter = '';
    this.applyFilters();
  }


  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }

  applyDateFilter(): void {
    this.filteredTimesheets = this.timesheets.filter(item => {
      const itemDate = new Date(item.timesheet_date);
      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);
      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);

      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });
    this.currentPage = 1;
    this.updatePage();
  }

  clearDateFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.filteredTimesheets = [...this.timesheets];
    this.currentPage = 1;
    this.updatePage();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
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

  // Export to Excel
  exportToExcel(): void {
    if (this.filteredTimesheets.length === 0) {
      alert('No data available for the selected filters.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      this.filteredTimesheets.map((item, index) => ({
        'S.No.': index + 1,
        'Customer Name': item.customer_name,
        'Project Name': item.project_name,
                'Project Manager': item.project_manager_name,

        'Timesheet Date': new Date(item.timesheet_date).toLocaleDateString('en-GB', { 
          day: '2-digit', month: 'short', year: 'numeric' 
        }),
        'Description': item.description,
        'Hours': item.hours,
        'Minutes': item.minutes
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PM Timesheets');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'PM_Timesheets_Report.xlsx');
  }

  calculateFilteredTotalTime(): { hours: number, minutes: number } {
    if (!this.filteredTimesheets || this.filteredTimesheets.length === 0) {
      return { hours: 0, minutes: 0 };
    }

    let totalMinutes = this.filteredTimesheets.reduce((sum, entry) => {
      return sum + (entry.hours * 60) + entry.minutes;
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    return { hours, minutes };
  }
}