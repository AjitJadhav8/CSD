import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsTeamComponent } from './all-projects-team.component';

describe('AllProjectsTeamComponent', () => {
  let component: AllProjectsTeamComponent;
  let fixture: ComponentFixture<AllProjectsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProjectsTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProjectsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
