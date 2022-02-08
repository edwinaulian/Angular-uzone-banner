import { TestBed, inject } from '@angular/core/testing';

import { DetailorderService } from './detailorder.service';

describe('DetailorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailorderService]
    });
  });

  it('should be created', inject([DetailorderService], (service: DetailorderService) => {
    expect(service).toBeTruthy();
  }));
});
