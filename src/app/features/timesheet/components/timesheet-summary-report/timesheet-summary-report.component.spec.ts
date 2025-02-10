import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetSummaryReportComponent } from './timesheet-summary-report.component';

describe('TimesheetSummaryReportComponent', () => {
  let component: TimesheetSummaryReportComponent;
  let fixture: ComponentFixture<TimesheetSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetSummaryReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
