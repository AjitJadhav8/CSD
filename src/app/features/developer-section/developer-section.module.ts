import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeveloperSectionDashboardComponent } from './developer-section-dashboard/developer-section-dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: DeveloperSectionDashboardComponent
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DeveloperSectionDashboardComponent,
  ]
})
export class DeveloperSectionModule { }