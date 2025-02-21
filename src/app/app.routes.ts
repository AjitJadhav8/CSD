import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppCenterComponent } from './features/app-center/app-center.component';
import { authGuard } from './guards/auth.guard'; // Correct import
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';


export const routes: Routes = [
    { path: '', redirectTo: 'app-center', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },  // Add this route
    { path: 'app-center', component: AppCenterComponent, canActivate: [authGuard] },
    { path: 'organisation', loadChildren: () => import('./features/organisation-section/organisation-section.module').then(m => m.OrganisationSectionModule), canActivate: [authGuard] },
    { path: 'timesheet', loadChildren: () => import('./features/timesheet/timesheet.module').then(m => m.TimesheetModule), canActivate: [authGuard] },
    { path: 'joining-pipeline', loadChildren: () => import('./features/joining-pipeline/joining-pipeline.module').then(m => m.JoiningPipelineModule), canActivate: [authGuard] },
    { path: 'resource-management', loadChildren: () => import('./features/resource-management/resource-management.module').then(m => m.ResourceManagementModule), canActivate: [authGuard] },
    { path: '**', redirectTo: 'app-center' }

];
