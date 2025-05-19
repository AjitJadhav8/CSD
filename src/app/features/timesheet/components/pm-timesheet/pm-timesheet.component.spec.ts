import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTimesheetComponent } from './pm-timesheet.component';

describe('PmTimesheetComponent', () => {
  let component: PmTimesheetComponent;
  let fixture: ComponentFixture<PmTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
