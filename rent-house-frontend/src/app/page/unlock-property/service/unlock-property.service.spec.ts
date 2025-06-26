import { TestBed } from '@angular/core/testing';

import { UnlockPropertyService } from './unlock-property.service';

describe('UnlockPropertyService', () => {
  let service: UnlockPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnlockPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
