import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningPipelineDashboardComponent } from './joining-pipeline-dashboard.component';

describe('JoiningPipelineDashboardComponent', () => {
  let component: JoiningPipelineDashboardComponent;
  let fixture: ComponentFixture<JoiningPipelineDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoiningPipelineDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoiningPipelineDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
