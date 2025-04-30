import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../services/report-service/report.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';

@Component({
  selector: 'app-project-team-report',
  standalone: true,
  imports: [NgSelectModule, FormsModule, CommonModule],
  templateUrl: './project-team-report.component.html',
  styleUrl: './project-team-report.component.css'
})

export class ProjectTeamReportComponent implements OnInit {
  billingStatusFilter: number | null = null;
  showReleased: boolean | null = null;
  projectTeams: any[] = [];
  filteredProjectTeams: any[] = [];
  paginatedProjectTeams: any[] = [];
  
  // Options for filters
  optionCustomers: any[] = [];
  optionProjects: any[] = [];
  optionEmployees: any[] = [];
  optionProjectRoles: any[] = [];
  optionProjectManagers: any[] = [];
  
  // Filters
  customerNameFilter: string = '';
  projectNameFilter: string = '';
  employeeNameFilter: string = '';
  projectRoleFilter: string = '';
  projectManagerFilter: string = '';
  startDateFilter: string = '';
  endDateFilter: string = '';
  allocationStatusFilter: number | null = null;
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;

  //stat
   // Employee statistics


  constructor(private reportService: ReportService,  private dataService: DataService,) { }

  ngOnInit(): void {
    this.fetchProjectTeams();
    this.fetchOptions();
  }

  fetchProjectTeams(): void {
    this.reportService.getAllProjectTeams().subscribe(
      (response) => {
        this.projectTeams = response;
        this.filteredProjectTeams = [...this.projectTeams];
        console.log('Project teams:', this.projectTeams);
        this.updatePage();
      },
      (error) => {
        console.error('Error fetching project teams:', error);
      }
    );
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionCustomers = response.customers;
        this.optionProjects = response.projects;
        this.optionEmployees = response.users;
        this.optionProjectRoles = response.projectRole;
        this.optionProjectManagers = response.projectManagers;
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

    // Modify the applyFilters method
    applyFilters(): void {
      this.filteredProjectTeams = this.projectTeams.filter(team => {
        return (
          (!this.customerNameFilter || team.customer_id == this.customerNameFilter) &&
          (!this.projectNameFilter || team.project_id == this.projectNameFilter) &&
          (!this.employeeNameFilter || team.employee_id == this.employeeNameFilter) &&
          (!this.projectRoleFilter || team.project_role_id == this.projectRoleFilter) &&
          (!this.projectManagerFilter || team.project_manager_id == this.projectManagerFilter) &&
          (!this.startDateFilter || this.formatDate(team.start_date) == this.startDateFilter) &&
          (!this.endDateFilter || this.formatDate(team.end_date) == this.endDateFilter) &&
          (this.allocationStatusFilter === null || team.allocation_status == this.allocationStatusFilter) &&
          (this.billingStatusFilter === null || team.billed_status == this.billingStatusFilter) &&
          (this.showReleased === null || team.is_released == (this.showReleased ? 1 : 0))
        );
      });
      
      // Update employee statistics
      this.currentPage = 1;
      this.updatePage();
    }


   // Modify clearFilters to reset new properties
   clearFilters(): void {
    this.customerNameFilter = '';
    this.projectNameFilter = '';
    this.employeeNameFilter = '';
    this.projectRoleFilter = '';
    this.projectManagerFilter = '';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.allocationStatusFilter = null;
    this.billingStatusFilter = null;
    this.showReleased = null;
    this.applyFilters();
  }
  clearFilter(filterName: string): void {
    (this as any)[filterName] = '';
    this.applyFilters();
  }

  // Pagination methods
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjectTeams = this.filteredProjectTeams.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProjectTeams.length / this.itemsPerPage);
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
}