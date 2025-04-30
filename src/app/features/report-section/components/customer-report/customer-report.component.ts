import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data-service/data.service';
import { ReportService } from '../../../../services/report-service/report.service';
import { SecureStorageService } from '../../../../services/secureStorage-service/secure-storage.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-report',
  standalone: true,
  imports: [NgSelectModule, CommonModule, FormsModule],
  templateUrl: './customer-report.component.html',
  styleUrl: './customer-report.component.css'
})

export class CustomerReportComponent implements OnInit {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  paginatedCustomers: any[] = [];
  
  // Filters
  customerNameFilter: string = '';
  companyWebsiteFilter: string = '';
  emailFilter: string = '';
  phoneFilter: string = '';
  statusFilter: string = '';
  sectorFilter: string = '';
  industryFilter: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 30;
  maxPageButtons: number = 5;
  
  // Options
  optionCustomers: any[] = [];
  distinctSectors: string[] = [];
  distinctIndustries: string[] = [];
  optionMasterCategory: any[] = [];
  segmentFilter: string = '';
typeFilter: string = '';
distinctSegments: string[] = [];

  constructor(
    private dataService: DataService,
    private reportService: ReportService,
    private secureStorage: SecureStorageService
  ) { }

  ngOnInit(): void {
    this.fetchOptions();
    this.fetchCustomers();
  }

  fetchOptions(): void {
    this.dataService.getOptions().subscribe(
      (response) => {
        this.optionMasterCategory = response.masterCategory;
        this.optionCustomers = response.customers;
        this.distinctSectors = this.getDistinctValues('sector');
        this.distinctIndustries = this.getDistinctValues('industry');
        this.distinctSegments = this.getDistinctValues('domain'); // Assuming 'domain' is the field for segment

      },
      (error) => {
        console.error('Error fetching options', error);
      }
    );
  }

  getDistinctValues(field: string): string[] {
    const values = this.optionMasterCategory.map((category) => category[field]);
    return [...new Set(values)];
  }

  fetchCustomers(): void {
    this.reportService.getCustomerReport().subscribe({
      next: (data) => {
        this.customers = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching customer report:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredCustomers = this.customers.filter((customer) => {
      return (
        (this.customerNameFilter
          ? customer.customer_id === this.customerNameFilter
          : true) &&
        (this.companyWebsiteFilter
          ? customer.customer_company_website?.toLowerCase().includes(this.companyWebsiteFilter.toLowerCase())
          : true) &&
        (this.emailFilter
          ? customer.customer_email?.toLowerCase().includes(this.emailFilter.toLowerCase())
          : true) &&
        (this.phoneFilter
          ? customer.customer_phone?.includes(this.phoneFilter)
          : true) &&
        (this.statusFilter
          ? (customer.is_active ? 'Active' : 'Inactive') === this.statusFilter
          : true) &&
        (this.sectorFilter
          ? customer.sector === this.sectorFilter
          : true) &&
        (this.industryFilter
          ? customer.industry === this.industryFilter
          : true) &&
        (this.segmentFilter
          ? customer.domain === this.segmentFilter
          : true) &&
        (this.typeFilter
          ? (customer.is_new ? 'Potential' : 'Existing') === this.typeFilter
          : true)
      );
    });
    this.currentPage = 1;
    this.updatePage();
  }

  clearFilters(): void {
    this.customerNameFilter = '';
    this.companyWebsiteFilter = '';
    this.emailFilter = '';
    this.phoneFilter = '';
    this.statusFilter = '';
    this.sectorFilter = '';
    this.industryFilter = '';
    this.segmentFilter = '';
    this.typeFilter = '';
    this.applyFilters();
  }

  clearFilter(filterName: string): void {
    switch (filterName) {
      case 'customerNameFilter':
        this.customerNameFilter = '';
        break;
      case 'companyWebsiteFilter':
        this.companyWebsiteFilter = '';
        break;
      case 'emailFilter':
        this.emailFilter = '';
        break;
      case 'phoneFilter':
        this.phoneFilter = '';
        break;
      case 'statusFilter':
        this.statusFilter = '';
        break;
      case 'sectorFilter':
        this.sectorFilter = '';
        break;
      case 'industryFilter':
        this.industryFilter = '';
        break;
    }
    this.applyFilters();
  }

  // Pagination methods
  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCustomers = this.filteredCustomers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
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
