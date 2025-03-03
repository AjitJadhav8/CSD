import { TestBed } from '@angular/core/testing';

import { RmgService } from './rmg.service';

describe('RmgService', () => {
  let service: RmgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
