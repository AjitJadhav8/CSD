import { Component } from '@angular/core';
import { RmgService } from '../../../../services/rmg-service/rmg.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { DataService } from '../../../../services/data-service/data.service';

@Component({
  selector: 'app-all-teams-timesheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
   taskStatusFilter: string = '';
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

    // Apply Filters
    applyFilters(): void {
      this.filteredTimesheets = this.timesheets.filter((timesheet) => {
        return (
          (!this.timesheetDateFilter || timesheet.timesheet_date === this.timesheetDateFilter) &&
          (!this.userNameFilter || timesheet.user_id?.toString() === this.userNameFilter.toString()) &&
          (!this.customerFilter || timesheet.customer_id?.toString() === this.customerFilter.toString()) &&
          (!this.projectFilter || timesheet.project_id?.toString() === this.projectFilter.toString()) &&
          (!this.projectDeliverableFilter || timesheet.pd_id?.toString() === this.projectDeliverableFilter.toString()) &&
          (!this.phasesFilter || timesheet.phase_id?.toString() === this.phasesFilter.toString()) &&

          (!this.taskStatusFilter || timesheet.task_status?.toString() === this.taskStatusFilter.toString())&&
          (!this.projectManagerFilter || timesheet.project_manager_id?.toString() === this.projectManagerFilter.toString()) // New filter
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
      this.taskStatusFilter = '';
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

}
