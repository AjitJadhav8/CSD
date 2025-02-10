import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteJoiningPipelineComponent } from './delete-joining-pipeline.component';

describe('DeleteJoiningPipelineComponent', () => {
  let component: DeleteJoiningPipelineComponent;
  let fixture: ComponentFixture<DeleteJoiningPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteJoiningPipelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteJoiningPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
