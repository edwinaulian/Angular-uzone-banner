import { Component, OnInit, Input } from '@angular/core';
import { DetailtourResponse } from '../../models/detailtour_response';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreditCard } from '../../models/creditcard';
import { CreditcardService } from '../../services/creditcard.service';

@Component({
  selector: 'uzone-secondstep-creditcard',
  templateUrl: './uzone-secondstep-creditcard.component.html',
  styles: []
})

export class UzoneSecondstepCreditcardComponent implements OnInit {
  @Input() bannerDetail: DetailtourResponse;
  today: number = Date.now();
  isValidFormSubmitted: boolean = null;

  creditcard = new FormGroup({
    typecc: new FormControl('', Validators.required),
    nocc:new FormControl('', Validators.required ),
    name: new FormControl('', Validators.required),
    validthru: new FormControl('', Validators.required),
    nocvv: new FormControl( '', Validators.required)
  });
  creditcards = new CreditCard();

  constructor(private creditcardService: CreditcardService ) { }

  ngOnInit() { }

  onSubmitCC() {
    this.isValidFormSubmitted = false;
    if ( this.creditcard.invalid ) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.creditcards.typecc = this.creditcard.get('typecc').value;
    this.creditcards.nocc = this.creditcard.get('nocc').value;
    this.creditcards.name = this.creditcard.get('name').value;
    this.creditcards.validthru = this.creditcard.get('validthru').value;
    this.creditcards.nocvv = this.creditcard.get('nocvv').value;
    this.creditcardService.AddNewCC(this.creditcards);
  }

}
