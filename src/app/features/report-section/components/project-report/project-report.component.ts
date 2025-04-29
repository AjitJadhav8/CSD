import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { ReportService } from '../../../../services/report-service/report.service';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-report',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule],
  templateUrl: './project-report.component.html',
  styleUrl: './project-report.component.css'
})

export class ProjectReportComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  paginatedProjects: any[] = [];
  
  // Filters
  projectNameFilter: string = '';
  customerFilter: string = '';
  managerFilter: string = '';
  typeFilter: string = '';
  engagementFilter: string = '';
  statusFilter: string = '';
  plannedStartFilter: string = '';
actualStartFilter: string = '';
tentativeEndFilter: string = '';
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;
  
  // Options
  optionProjects: any[] = [];
  optionCustomers: any[] = [];
  optionManagers: any[] = [];
  optionProjectTypes: any[] = [];
  optionEngagementTypes: any[] = [];
  optionStatuses: any[] = [];

  constructor(
    private dataService: DataService,
    private reportService: ReportService,
    private secureStorage: SecureStorageService
  ) { }

  ngOnInit(): void {
    this.fetchOptions();
    this.fetchProjects();
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionProjects = response.projects;
        this.optionCustomers = response.customers;
        this.optionManagers = response.users;
        this.optionProjectTypes = response.typeOfProject;
        this.optionEngagementTypes = response.typeOfEngagement;
        this.optionStatuses = response.projectStatus;
      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
  }

  fetchProjects(): void {
    this.reportService.getProjectReport().subscribe({
      next: (data) => {
        this.projects = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching project report:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredProjects = this.projects.filter((project) => {
      const plannedStartDate = this.plannedStartFilter 
        ? new Date(this.plannedStartFilter) 
        : null;
      const actualStartDate = this.actualStartFilter 
        ? new Date(this.actualStartFilter) 
        : null;
      const tentativeEndDate = this.tentativeEndFilter 
        ? new Date(this.tentativeEndFilter) 
        : null;
  
      return (
        (this.projectNameFilter
          ? project.project_id === +this.projectNameFilter
          : true) &&
        (this.customerFilter
          ? project.customer_id === +this.customerFilter
          : true) &&
        (this.managerFilter
          ? project.project_manager_id === +this.managerFilter
          : true) &&
        (this.typeFilter
          ? project.type_of_project_id === +this.typeFilter
          : true) &&
        (this.engagementFilter
          ? project.type_of_engagement_id === +this.engagementFilter
          : true) &&
        (this.statusFilter
          ? project.project_status_id === +this.statusFilter
          : true) &&
        (!plannedStartDate || 
          (project.planned_start_date && 
           new Date(project.planned_start_date).toDateString() === plannedStartDate.toDateString())) &&
        (!actualStartDate || 
          (project.actual_start_date && 
           new Date(project.actual_start_date).toDateString() === actualStartDate.toDateString())) &&
        (!tentativeEndDate || 
          (project.tentative_end_date && 
           new Date(project.tentative_end_date).toDateString() === tentativeEndDate.toDateString()))
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }

  clearFilters(): void {
    this.projectNameFilter = '';
    this.customerFilter = '';
    this.managerFilter = '';
    this.typeFilter = '';
    this.engagementFilter = '';
    this.statusFilter = '';
    this.plannedStartFilter = '';
    this.actualStartFilter = '';
    this.tentativeEndFilter = '';
    this.applyFilters();
  }

  // Pagination methods
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProjects = this.filteredProjects.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
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

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
