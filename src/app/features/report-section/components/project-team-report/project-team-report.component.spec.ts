import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamReportComponent } from './project-team-report.component';

describe('ProjectTeamReportComponent', () => {
  let component: ProjectTeamReportComponent;
  let fixture: ComponentFixture<ProjectTeamReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTeamReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTeamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
