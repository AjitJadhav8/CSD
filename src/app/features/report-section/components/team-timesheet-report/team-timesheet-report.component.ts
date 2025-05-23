import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import saveAs from 'file-saver';
import { ReportService } from '../../../../services/report-service/report.service';
import * as XLSX from 'xlsx'; // Import SheetJS
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-team-timesheet-report',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './team-timesheet-report.component.html',
  styleUrl: './team-timesheet-report.component.css'
})

export class TeamTimesheetReportComponent implements OnInit {
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
  fromDate: string = '';
  toDate: string = '';

  // Options for filters
  optionUsers: any[] = [];
  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  optionProjectDeliverables: any[] = [];
  optionProjectManagers: any[] = [];
  optionPhases: any[] = [];

   distinctProjectNames: {name: string, ids: number[]}[] = [];
  distinctTaskNames: {name: string, ids: number[]}[] = [];
  projectNameFilter: string = '';
  taskNameFilter: string = '';

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.fetchTimesheets();
    this.fetchOptions();
  }

  fetchTimesheets(): void {
    this.reportService.getAllTeamTimesheets().subscribe(
      (response) => {
        this.timesheets = response;
        this.filteredTimesheets = [...this.timesheets];
        this.updatePage();
        this.calculateFilteredTotalTime();
      },
      (error) => {
        console.error('Error fetching timesheets:', error);
      }
    );
  }

  // fetchOptions(): void {
  //   this.reportService.getReportOptions().subscribe(
  //     (response) => {
  //       this.optionUsers = response.users;
  //       this.optionCustomers = response.customers;
  //       this.optionProjects = response.projects;
  //       this.optionProjectDeliverables = response.projectDeliverables;
  //       this.optionProjectManagers = response.projectManagers;
  //       this.optionPhases = response.phases;
  //     },
  //     (error) => {
  //       console.error('Error fetching options:', error);
  //     }
  //   );
  // }

  fetchOptions(): void {
    this.reportService.getReportOptions().subscribe(
      (response) => {
        this.optionUsers = response.users;
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionProjectDeliverables = response.projectDeliverables;
        this.optionProjectManagers = response.projectManagers;
        this.optionPhases = response.phases;

        // Create distinct project names list
        const projectMap = new Map<string, number[]>();
        response.projects.forEach((project: { project_name: string; project_id: number; }) => {
          if (projectMap.has(project.project_name)) {
            projectMap.get(project.project_name)!.push(project.project_id);
          } else {
            projectMap.set(project.project_name, [project.project_id]);
          }
        });
        this.distinctProjectNames = Array.from(projectMap.entries()).map(([name, ids]) => ({
          name,
          ids
        }));

        // Create distinct task names list (using phases)
        const taskMap = new Map<string, number[]>();
        response.phases.forEach((phase: { project_phase_name: string; phase_id: number; }) => {
          if (taskMap.has(phase.project_phase_name)) {
            taskMap.get(phase.project_phase_name)!.push(phase.phase_id);
          } else {
            taskMap.set(phase.project_phase_name, [phase.phase_id]);
          }
        });
        this.distinctTaskNames = Array.from(taskMap.entries()).map(([name, ids]) => ({
          name,
          ids
        }));
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  applyFilters(): void {
    this.filteredTimesheets = this.timesheets.filter((timesheet) => {
      // Project name filter logic
      const projectNameMatch = !this.projectNameFilter || 
        timesheet.project_name === this.projectNameFilter;
      
      // Task name filter logic
      const taskNameMatch = !this.taskNameFilter || 
        timesheet.project_phase_name === this.taskNameFilter;

      return (
        (!this.timesheetDateFilter || 
          this.formatDate(timesheet.timesheet_date) === this.timesheetDateFilter) &&
        (!this.userNameFilter || timesheet.user_id == this.userNameFilter) &&
        (!this.customerFilter || timesheet.customer_id == this.customerFilter) &&
        projectNameMatch && // Using project name filter instead of project ID
        (!this.projectDeliverableFilter || timesheet.pd_id == this.projectDeliverableFilter) &&
        taskNameMatch && // Using task name filter instead of phase ID
        (this.taskStatusFilter !== null ? timesheet.task_status === this.taskStatusFilter : true) &&
        (!this.projectManagerFilter || timesheet.project_manager_id == this.projectManagerFilter)
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }

  clearFilters(): void {
    this.timesheetDateFilter = '';
    this.userNameFilter = '';
    this.customerFilter = '';
    this.projectNameFilter = ''; // Changed from projectFilter
    this.projectDeliverableFilter = '';
    this.taskStatusFilter = null;
    this.taskNameFilter = ''; // Changed from phasesFilter
    this.projectManagerFilter = '';
    this.applyFilters();
  }

  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }

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
        'Timesheet Date': new Date(item.timesheet_date).toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
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

    saveAs(data, 'TeamTimesheetReport.xlsx');
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