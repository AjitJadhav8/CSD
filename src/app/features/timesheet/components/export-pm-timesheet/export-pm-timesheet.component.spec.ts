import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPmTimesheetComponent } from './export-pm-timesheet.component';

describe('ExportPmTimesheetComponent', () => {
  let component: ExportPmTimesheetComponent;
  let fixture: ComponentFixture<ExportPmTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPmTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportPmTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
