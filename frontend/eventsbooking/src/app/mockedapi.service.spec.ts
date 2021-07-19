import { TestBed } from '@angular/core/testing';

import { MockedapiService } from './mockedapi.service';

describe('MockedapiService', () => {
  let service: MockedapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockedapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
