import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportMyTimesheetComponent } from './export-my-timesheet.component';

describe('ExportMyTimesheetComponent', () => {
  let component: ExportMyTimesheetComponent;
  let fixture: ComponentFixture<ExportMyTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportMyTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportMyTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
