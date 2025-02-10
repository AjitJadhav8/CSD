import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResourceDemandComponent } from './view-resource-demand.component';

describe('ViewResourceDemandComponent', () => {
  let component: ViewResourceDemandComponent;
  let fixture: ComponentFixture<ViewResourceDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewResourceDemandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResourceDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
