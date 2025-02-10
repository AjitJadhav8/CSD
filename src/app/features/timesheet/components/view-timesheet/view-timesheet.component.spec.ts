import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimesheetComponent } from './view-timesheet.component';

describe('ViewTimesheetComponent', () => {
  let component: ViewTimesheetComponent;
  let fixture: ComponentFixture<ViewTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
