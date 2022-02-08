import { Injectable } from '@angular/core';
import { CreditCard } from '../models/creditcard';

@Injectable()
export class CreditcardService {

  AddNewCC(cc: CreditCard) {
    console.log("Type cc: " + cc.typecc);
    console.log("No cc: " + cc.nocc);
    console.log("name: " + cc.name);
    console.log("valid thru: " + cc.validthru);
    console.log("nocvv: " + cc.nocvv)
  }

}
