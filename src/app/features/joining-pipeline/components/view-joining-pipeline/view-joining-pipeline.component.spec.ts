import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJoiningPipelineComponent } from './view-joining-pipeline.component';

describe('ViewJoiningPipelineComponent', () => {
  let component: ViewJoiningPipelineComponent;
  let fixture: ComponentFixture<ViewJoiningPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJoiningPipelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJoiningPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
