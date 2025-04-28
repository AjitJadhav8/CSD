import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTimesheetReportComponent } from './team-timesheet-report.component';

describe('TeamTimesheetReportComponent', () => {
  let component: TeamTimesheetReportComponent;
  let fixture: ComponentFixture<TeamTimesheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamTimesheetReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTimesheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
