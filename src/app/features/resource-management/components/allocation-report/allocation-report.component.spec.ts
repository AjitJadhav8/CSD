import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationReportComponent } from './allocation-report.component';

describe('AllocationReportComponent', () => {
  let component: AllocationReportComponent;
  let fixture: ComponentFixture<AllocationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllocationReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
