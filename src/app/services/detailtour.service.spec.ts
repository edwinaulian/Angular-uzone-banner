import { TestBed, inject } from '@angular/core/testing';

import { DetailtourService } from './detailtour.service';

describe('DetailtourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailtourService]
    });
  });

  it('should be created', inject([DetailtourService], (service: DetailtourService) => {
    expect(service).toBeTruthy();
  }));
});
