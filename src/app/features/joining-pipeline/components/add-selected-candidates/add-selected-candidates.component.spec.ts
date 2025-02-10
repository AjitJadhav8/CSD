import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSelectedCandidatesComponent } from './add-selected-candidates.component';

describe('AddSelectedCandidatesComponent', () => {
  let component: AddSelectedCandidatesComponent;
  let fixture: ComponentFixture<AddSelectedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSelectedCandidatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSelectedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
