import { TestBed } from '@angular/core/testing';

import { RestConnectionService } from './rest-connection.service';

describe('RestConnectionService', () => {
  let service: RestConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
