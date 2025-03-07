import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResourceManagementDashboardComponent } from './resource-management-dashboard/resource-management-dashboard.component';
import { AllocationReportComponent } from './components/allocation-report/allocation-report.component';
import { AssignProjectTeamComponent } from './components/assign-project-team/assign-project-team.component';
import { AllTeamsTimesheetComponent } from './components/all-teams-timesheet/all-teams-timesheet.component';
import { AllProjectsTeamComponent } from './components/all-projects-team/all-projects-team.component';
import { ViewResourceDemandComponent } from './components/view-resource-demand/view-resource-demand.component';
import { ViewUpdateEmployeeSkillsComponent } from './components/view-update-employee-skills/view-update-employee-skills.component';


const routes: Routes = [
  { 
    path: '', component: ResourceManagementDashboardComponent, 
    children: [
      { path: '', redirectTo: 'assign-project-team', pathMatch: 'full' }, // ✅ Default to Assign Project Team
      { path: 'assign-project-team', component: AssignProjectTeamComponent },
      { path: 'allocation-report', component: AllocationReportComponent },
      { path: 'all-teams-timesheet', component: AllTeamsTimesheetComponent },
      { path: 'all-projects-team', component: AllProjectsTeamComponent },
      { path: 'view-resource-demand', component: ViewResourceDemandComponent },
      { path: 'view-update-employee-skills', component: ViewUpdateEmployeeSkillsComponent },
    ]
  }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ResourceManagementDashboardComponent,
    AllocationReportComponent,
    AssignProjectTeamComponent,
    AllTeamsTimesheetComponent,
    AllProjectsTeamComponent,
    ViewResourceDemandComponent,
    ViewUpdateEmployeeSkillsComponent,
  ]
})
export class ResourceManagementModule { }
