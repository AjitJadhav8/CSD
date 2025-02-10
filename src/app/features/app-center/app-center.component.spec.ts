import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCenterComponent } from './app-center.component';

describe('AppCenterComponent', () => {
  let component: AppCenterComponent;
  let fixture: ComponentFixture<AppCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
