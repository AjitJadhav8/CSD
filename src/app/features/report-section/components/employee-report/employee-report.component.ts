import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../../services/report-service/report.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';

@Component({
  selector: 'app-employee-report',
  standalone: true,
  imports: [ NgSelectModule, FormsModule, CommonModule],
  templateUrl: './employee-report.component.html',
  styleUrl: './employee-report.component.css'
})
export class EmployeeReportComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  paginatedEmployees: any[] = [];
  
  // Options for filters
  optionEmployees: any[] = [];
  optionDepartments: any[] = [];
  optionDesignations: any[] = [];
  optionManagers: any[] = [];
  
  // Filters
  employeeCodeFilter: string = '';
  nameFilter: string = '';
  emailFilter: string = '';
  departmentFilter: string = '';
  designationFilter: string = '';
  reportingManagerFilter: string = '';
  contactFilter: string = '';
joinDateFilter: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;
  totalEmployees: number = 0;

  constructor(private reportService: ReportService, private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchEmployees();
    this.fetchOptions();
  }

  fetchEmployees(): void {
    this.reportService.getAllEmployees().subscribe(
      (response) => {
        this.employees = response;
        this.filteredEmployees = [...this.employees];
        this.totalEmployees = this.employees.length;
        this.updatePage();
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionEmployees = response.users;
        this.optionDepartments = response.departments;
        this.optionDesignations = response.designation;
        this.optionManagers = response.users;
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredEmployees = this.employees.filter(emp => {
      const joinDate = this.joinDateFilter ? new Date(this.joinDateFilter) : null;
      
      return (
        (!this.employeeCodeFilter || (emp.user_code && emp.user_code.toLowerCase().includes(this.employeeCodeFilter.toLowerCase()))) &&
        (!this.nameFilter || emp.user_id == this.nameFilter) &&
        (!this.emailFilter || (emp.user_email && emp.user_email.toLowerCase().includes(this.emailFilter.toLowerCase()))) &&
        (!this.contactFilter || (emp.user_contact && emp.user_contact.includes(this.contactFilter))) &&
        (!this.departmentFilter || emp.department_id == this.departmentFilter) &&
        (!this.designationFilter || emp.designation_id == this.designationFilter) &&
        (!this.reportingManagerFilter || emp.reporting_manager_id == this.reportingManagerFilter) &&
        (!joinDate || (emp.user_DOJ && new Date(emp.user_DOJ).toDateString() === joinDate.toDateString()))
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }

  clearFilters(): void {
    this.employeeCodeFilter = '';
    this.nameFilter = '';
    this.emailFilter = '';
    this.contactFilter = '';
    this.departmentFilter = '';
    this.designationFilter = '';
    this.reportingManagerFilter = '';
    this.joinDateFilter = '';
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
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
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