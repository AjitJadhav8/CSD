import { Component } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx'; // Import SheetJS
import { saveAs } from 'file-saver';
import { DataService } from '../../../../services/data-service/data.service';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';

@Component({
  selector: 'app-export-pm-timesheet',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './export-pm-timesheet.component.html',
  styleUrl: './export-pm-timesheet.component.css'
})

export class ExportPmTimesheetComponent {
  userId: number | null = null;
  fullTimesheetData: any[] = [];
  filteredTimesheetData: any[] = [];
  displayedTimesheetData: any[] = [];
  
  // Filters
  fromDate: string = '';
  toDate: string = '';
  customerFilter: number | null = null;
  projectFilter: number | null = null;
  timesheetDateFilter: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 50;
  maxPageButtons: number = 5;
  
  // Options
  optionCustomers: any[] = [];
  optionProjects: any[] = [];

  constructor(
    private timesheetService: TimesheetService,
    private dataService: DataService,
    private secureStorage: SecureStorageService
  ) { }

  ngOnInit(): void {
    const storedUserId = this.secureStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchMyPmTimesheets();
      this.fetchOptions();
    } else {
      console.error('User ID not found in local storage.');
    }
  }

  fetchMyPmTimesheets(): void {
    if (!this.userId) return;

    this.timesheetService.getMyPmTimesheets(this.userId).subscribe(
      (response) => {
        this.fullTimesheetData = response.map((item: any) => ({
          ...item,
          timesheet_date: item.timesheet_date ? new Date(item.timesheet_date) : null
        }));
        this.filteredTimesheetData = [...this.fullTimesheetData];
        this.updateDisplayedData();
      },
      (error) => {
        console.error('Error fetching PM timesheets:', error);
      }
    );
  }

  fetchOptions(): void {
    if (!this.userId) return;
    
    // Get customers for projects managed by this PM
    this.timesheetService.getPmCustomers(this.userId).subscribe(
      (response) => {
        this.optionCustomers = response;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

    // Get projects managed by this PM
    this.timesheetService.getPmProjects(this.userId).subscribe(
      (response) => {
        this.optionProjects = response;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredTimesheetData = this.fullTimesheetData.filter((timesheet) => {
      // Date range filter
      const itemDate = new Date(timesheet.timesheet_date);
      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);
      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);
      
      // Convert all filter values to strings for consistent comparison
      const tsCustomerId = timesheet.customer_id?.toString();
      const tsProjectId = timesheet.project_id?.toString();
      const tsDate = this.formatDate(timesheet.timesheet_date);
      
      return (
        // Date range conditions
        (!from || itemDate >= from) && 
        (!to || itemDate <= to) &&
        
        // Other filter conditions
        (!this.customerFilter || tsCustomerId === this.customerFilter?.toString()) &&
        (!this.projectFilter || tsProjectId === this.projectFilter?.toString()) &&
        (!this.timesheetDateFilter || tsDate === this.formatDateForComparison(this.timesheetDateFilter))
      );
    });
    
    this.currentPage = 1;
    this.updateDisplayedData();
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
      alert('No data available for the selected filters.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      this.filteredTimesheetData.map((item, index) => ({
        'S.No.': index + 1,
        'Customer Name': item.customer_name,
        'Project Name': item.project_name,
        'Hours': item.hours,
        'Minutes': item.minutes,
        'Description': item.description,
        'Date': new Date(item.timesheet_date).toLocaleDateString('en-GB', { 
          day: '2-digit', month: 'short', year: 'numeric' 
        }),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'My PM Timesheets');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(data, 'My_PM_Timesheets.xlsx');
  }

  clearDateFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.applyFilters();
  }

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.customerFilter = null;
    this.projectFilter = null;
    this.timesheetDateFilter = '';
    this.applyFilters();
  }

  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }

  formatDateForComparison(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }
}