import { TestBed } from '@angular/core/testing';

import { MyPropertyService } from './my-property.service';

describe('MyPropertyService', () => {
  let service: MyPropertyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyPropertyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
