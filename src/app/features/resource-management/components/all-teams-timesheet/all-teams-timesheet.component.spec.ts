import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamsTimesheetComponent } from './all-teams-timesheet.component';

describe('AllTeamsTimesheetComponent', () => {
  let component: AllTeamsTimesheetComponent;
  let fixture: ComponentFixture<AllTeamsTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTeamsTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTeamsTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
