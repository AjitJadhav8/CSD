import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBackdatedTimesheetComponent } from './fill-backdated-timesheet.component';

describe('FillBackdatedTimesheetComponent', () => {
  let component: FillBackdatedTimesheetComponent;
  let fixture: ComponentFixture<FillBackdatedTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillBackdatedTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillBackdatedTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
