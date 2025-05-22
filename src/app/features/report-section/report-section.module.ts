import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamTimesheetReportComponent } from './components/team-timesheet-report/team-timesheet-report.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReportSectionDashboardComponent } from './report-section-dashboard/report-section-dashboard.component';
import { ProjectTeamReportComponent } from './components/project-team-report/project-team-report.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';
import { ProjectReportComponent } from './components/project-report/project-report.component';
import { CustomerReportComponent } from './components/customer-report/customer-report.component';
import { PmTimesheetReportComponent } from './components/pm-timesheet-report/pm-timesheet-report.component';

const routes: Routes = [
  { 
    path: '', component: ReportSectionDashboardComponent, 
    children: [
      { path: '', redirectTo: 'project-team-report', pathMatch: 'full' },
      { path: 'project-team-report', component: ProjectTeamReportComponent }, // Add this line

      { path: 'pm-timesheet-report', component: PmTimesheetReportComponent },

      { path: 'team-timesheet-report', component: TeamTimesheetReportComponent },
      {path: 'employee-report', component:EmployeeReportComponent},
      {path: 'project-report', component : ProjectReportComponent},
      {path: 'customer-report', component : CustomerReportComponent}

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