import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JoiningPipelineDashboardComponent } from './components/joining-pipeline-dashboard/joining-pipeline-dashboard.component';
import { ViewJoiningPipelineComponent } from './components/view-joining-pipeline/view-joining-pipeline.component';
import { CreateDesignationComponent } from './components/create-designation/create-designation.component';
import { AddSelectedCandidatesComponent } from './components/add-selected-candidates/add-selected-candidates.component';
import { DeleteJoiningPipelineComponent } from './components/delete-joining-pipeline/delete-joining-pipeline.component';




const routes: Routes = [
  { 
    path: '', component: JoiningPipelineDashboardComponent, 
    children: [
      { path: 'view', component: ViewJoiningPipelineComponent },
      { path: 'create-designation', component: CreateDesignationComponent},
      { path: 'add-selected-candidates', component: AddSelectedCandidatesComponent },
      { path: 'delete', component: DeleteJoiningPipelineComponent },
    ]
  }
];


@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    JoiningPipelineDashboardComponent,
    ViewJoiningPipelineComponent,
    CreateDesignationComponent,
    AddSelectedCandidatesComponent,
    DeleteJoiningPipelineComponent
  ]
})
export class JoiningPipelineModule { }
