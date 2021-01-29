import { TestBed } from '@angular/core/testing';

import { BBDDServiceService } from './bbddservice.service';

describe('BBDDServiceService', () => {
  let service: BBDDServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BBDDServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
