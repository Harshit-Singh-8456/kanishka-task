import { TestBed } from '@angular/core/testing';

import { EmpApiService } from './emp-api.service';

describe('EmpApiService', () => {
  let service: EmpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
