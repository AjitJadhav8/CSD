import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSectionDashboardComponent } from './developer-section-dashboard.component';

describe('DeveloperSectionDashboardComponent', () => {
  let component: DeveloperSectionDashboardComponent;
  let fixture: ComponentFixture<DeveloperSectionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperSectionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperSectionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
