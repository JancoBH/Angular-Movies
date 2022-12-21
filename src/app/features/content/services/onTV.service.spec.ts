import { TestBed, inject } from '@angular/core/testing';

import { OnTVService } from './onTV.service';

describe('OnTVService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnTVService]
    });
  });

  it('should be created', inject([OnTVService], (service: OnTVService) => {
    expect(service).toBeTruthy();
  }));
});
