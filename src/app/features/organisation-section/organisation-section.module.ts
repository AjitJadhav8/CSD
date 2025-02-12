import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationDashboardComponent } from './components/organisation-dashboard/organisation-dashboard.component';

import { RouterModule, Routes } from '@angular/router';





import { CustomerComponent } from './components/customer/customer.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ProjectComponent } from './components/project/project.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { 
    path: '', component: OrganisationDashboardComponent,
    children: [
      { path: '', redirectTo: 'customer', pathMatch: 'full' }, // ✅ Default to Customer
      { path: 'customer', component: CustomerComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'admin', component: AdminComponent },
    ]
  }
];



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrganisationDashboardComponent,
    // CreateComponent,
    // ViewComponent,
    // DeleteComponent,
    CustomerComponent,
    EmployeeComponent,
    ProjectComponent,
    AdminComponent
  ]
})
export class OrganisationSectionModule { }




// import { CreateComponent } from './components/create/create.component';
// import { ViewComponent } from './components/view/view.component';
// import { DeleteComponent } from './components/delete/delete.component';
// const routes: Routes = [
//   { 
//     path: '', component: OrganisationDashboardComponent, 
//     children: [
//       { path: 'create', component: CreateComponent },
//       { path: 'view', component: ViewComponent },
//       { path: 'delete', component: DeleteComponent },
//     ]
//   }
// ];