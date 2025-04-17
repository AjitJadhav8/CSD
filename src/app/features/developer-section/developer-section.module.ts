import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperSectionDashboardComponent } from './developer-section-dashboard/developer-section-dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

const routes: Routes = [
  { 
    path: '', 
    component: DeveloperSectionDashboardComponent,
    children: [
      { path: 'user-management', component: UserManagementComponent } // Removed the redirect
    ]
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DeveloperSectionDashboardComponent,
    UserManagementComponent,
  ]
})
export class DeveloperSectionModule { }