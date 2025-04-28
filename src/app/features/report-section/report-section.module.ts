import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamTimesheetReportComponent } from './components/team-timesheet-report/team-timesheet-report.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportSectionDashboardComponent } from './report-section-dashboard/report-section-dashboard.component';
import { ProjectTeamReportComponent } from './components/project-team-report/project-team-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';

const routes: Routes = [
  { 
    path: '', component: ReportSectionDashboardComponent, 
    children: [
      { path: '', redirectTo: 'team-timesheet-report', pathMatch: 'full' },
      { path: 'team-timesheet-report', component: TeamTimesheetReportComponent },
      { path: 'project-team-report', component: ProjectTeamReportComponent }, // Add this line
      {path: 'employee-report', component:EmployeeReportComponent}

    ]
  }
];

@NgModule({
  declarations: [
   
  ],
  imports: [

    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgSelectModule,
    TeamTimesheetReportComponent,
ReportSectionDashboardComponent,
ProjectTeamReportComponent
]
})
export class ReportSectionModule { }