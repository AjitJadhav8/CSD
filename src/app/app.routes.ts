import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppCenterComponent } from './features/app-center/app-center.component';

export const routes: Routes = [
    { path: '', redirectTo: 'app-center', pathMatch: 'full' },
    { path: 'app-center', component: AppCenterComponent },
    { path: 'organisation', loadChildren: () => import('./features/organisation-section/organisation-section.module').then(m => m.OrganisationSectionModule) },
    { path: 'timesheet', loadChildren: () => import('./features/timesheet/timesheet.module').then(m => m.TimesheetModule) },
    { path: 'joining-pipeline', loadChildren: () => import('./features/joining-pipeline/joining-pipeline.module').then(m => m.JoiningPipelineModule) },
    { path: 'resource-management', loadChildren: () => import('./features/resource-management/resource-management.module').then(m => m.ResourceManagementModule) },
    { path: '**', redirectTo: 'app-center' }

];
