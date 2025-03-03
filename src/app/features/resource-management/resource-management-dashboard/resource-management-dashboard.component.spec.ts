import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceManagementDashboardComponent } from './resource-management-dashboard.component';

describe('ResourceManagementDashboardComponent', () => {
  let component: ResourceManagementDashboardComponent;
  let fixture: ComponentFixture<ResourceManagementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceManagementDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceManagementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
