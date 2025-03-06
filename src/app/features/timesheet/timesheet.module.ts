import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetDashboardComponent } from './timesheet-dashboard/timesheet-dashboard.component';
import { TimesheetSummaryReportComponent } from './components/timesheet-summary-report/timesheet-summary-report.component';
import { FillBackdatedTimesheetComponent } from './components/fill-backdated-timesheet/fill-backdated-timesheet.component';
import { ViewMyProjectsComponent } from './components/view-my-projects/view-my-projects.component';
import { FillTimesheetComponent } from './components/fill-timesheet/fill-timesheet.component';
import { ViewTimesheetComponent } from './components/view-timesheet/view-timesheet.component';
import { ExportMyTimesheetComponent } from './components/export-my-timesheet/export-my-timesheet.component';
import { ManagersHubComponent } from './components/managers-hub/managers-hub.component';





const routes: Routes = [
  { 
    path: '', component: TimesheetDashboardComponent, 
    children: [
      { path: '', redirectTo: 'fill-timesheet', pathMatch: 'full' }, // ✅ Default to Summary Report
      { path: 'summary-report', component: TimesheetSummaryReportComponent },
      { path: 'fill-backdated-timesheet', component: FillBackdatedTimesheetComponent },
      { path: 'view-my-projects', component: ViewMyProjectsComponent },
      { path: 'fill-timesheet', component: FillTimesheetComponent },
      { path: 'view-timesheet', component: ViewTimesheetComponent },
      { path: 'export-my-timesheet', component: ExportMyTimesheetComponent },
      { path: 'managers-hub', component: ManagersHubComponent },
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TimesheetDashboardComponent,
    TimesheetSummaryReportComponent,
    FillBackdatedTimesheetComponent,
    ViewMyProjectsComponent,
    FillTimesheetComponent,
    ViewTimesheetComponent,
    ExportMyTimesheetComponent,
    ManagersHubComponent
  ]
})
export class TimesheetModule { }
