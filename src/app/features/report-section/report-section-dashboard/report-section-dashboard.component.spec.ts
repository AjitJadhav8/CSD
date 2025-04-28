import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSectionDashboardComponent } from './report-section-dashboard.component';

describe('ReportSectionDashboardComponent', () => {
  let component: ReportSectionDashboardComponent;
  let fixture: ComponentFixture<ReportSectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSectionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
