import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdateEmployeeSkillsComponent } from './view-update-employee-skills.component';

describe('ViewUpdateEmployeeSkillsComponent', () => {
  let component: ViewUpdateEmployeeSkillsComponent;
  let fixture: ComponentFixture<ViewUpdateEmployeeSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUpdateEmployeeSkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUpdateEmployeeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
