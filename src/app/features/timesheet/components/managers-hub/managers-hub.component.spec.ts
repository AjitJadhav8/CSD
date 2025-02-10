import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersHubComponent } from './managers-hub.component';

describe('ManagersHubComponent', () => {
  let component: ManagersHubComponent;
  let fixture: ComponentFixture<ManagersHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagersHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagersHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
