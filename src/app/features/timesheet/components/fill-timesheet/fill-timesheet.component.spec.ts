import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillTimesheetComponent } from './fill-timesheet.component';

describe('FillTimesheetComponent', () => {
  let component: FillTimesheetComponent;
  let fixture: ComponentFixture<FillTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
