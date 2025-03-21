import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';
import * as XLSX from 'xlsx'; // Import SheetJS
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-export-my-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './export-my-timesheet.component.html',
  styleUrl: './export-my-timesheet.component.css'
})
export class ExportMyTimesheetComponent {

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchFullTimesheets();
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

  // Pagination Variables
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5; // Show only 5 page numbers at a time


  applyDateFilter(): void {
    this.filteredTimesheetData = this.fullTimesheetData.filter(item => {
      const itemDate = new Date(item.timesheet_date);

      const from = this.fromDate ? new Date(this.fromDate) : null;
      if (from) from.setHours(0, 0, 0, 0);

      const to = this.toDate ? new Date(this.toDate) : null;
      if (to) to.setHours(23, 59, 59, 999);

      return (!from || itemDate >= from) && (!to || itemDate <= to);
    });

    this.currentPage = 1; // Reset to first page after filtering
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
  // Compute the visible page numbers
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
        console.log('Full Timesheet Data:', response);
        this.fullTimesheetData = response;
        this.applyDateFilter();

      },
      (error) => {
        console.error('Error fetching full timesheets:', error);
      }
    );
  }

}
