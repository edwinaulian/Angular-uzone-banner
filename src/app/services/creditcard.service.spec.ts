import { TestBed, inject } from '@angular/core/testing';

import { CreditcardService } from './creditcard.service';

describe('CreditcardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditcardService]
    });
  });

  it('should be created', inject([CreditcardService], (service: CreditcardService) => {
    expect(service).toBeTruthy();
  }));
});
