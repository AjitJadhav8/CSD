import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from '../../../../services/timesheet-service/timesheet.service';

@Component({
  selector: 'app-export-my-timesheet',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './export-my-timesheet.component.html',
  styleUrl: './export-my-timesheet.component.css'
})
export class ExportMyTimesheetComponent {

userId: number | null = null;
  fullTimesheetData: any[] = [];

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchFullTimesheets();
    } else {
      console.error('User ID not found in local storage.');
    }
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
      },
      (error) => {
        console.error('Error fetching full timesheets:', error);
      }
    );
  }

}
