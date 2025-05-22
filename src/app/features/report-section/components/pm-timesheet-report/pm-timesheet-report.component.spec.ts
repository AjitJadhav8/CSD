import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTimesheetReportComponent } from './pm-timesheet-report.component';

describe('PmTimesheetReportComponent', () => {
  let component: PmTimesheetReportComponent;
  let fixture: ComponentFixture<PmTimesheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmTimesheetReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmTimesheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
