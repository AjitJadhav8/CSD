import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganisationDashboardComponent } from './components/organisation-dashboard/organisation-dashboard.component';
import { CreateComponent } from './components/create/create.component';
import { ViewComponent } from './components/view/view.component';
import { DeleteComponent } from './components/delete/delete.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { 
    path: '', component: OrganisationDashboardComponent, 
    children: [
      { path: 'create', component: CreateComponent },
      { path: 'view', component: ViewComponent },
      { path: 'delete', component: DeleteComponent },
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
    CreateComponent,
    ViewComponent,
    DeleteComponent,

  ]
})
export class OrganisationSectionModule { }
