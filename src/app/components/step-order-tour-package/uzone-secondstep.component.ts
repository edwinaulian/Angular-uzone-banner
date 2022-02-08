import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'uzone-secondstep',
  templateUrl: './uzone-secondstep.component.html',
  styles: []
})
export class UzoneSecondstepComponent implements OnInit {
  @Input() bannerDetail: DetailtourResponse;
  @Input() num_of_package: any;
  @Input() order_num: any;

  // data for step 2
  @Input() namevalue: any;
  @Input() phonevalue: number;
  @Input() emailvalue: any;
  @Input() pricevalueatms: any;
  @Input() pricevaluembankings: any;
  @Input() pricevaluelocalstores: any;
  @Input() pricevaluecreditcards: any;
  @Input() hes: any;

  @Input() realpriceatm: any;
  @Input() realpricembanking: any;
  @Input() realpricelc: any;
  @Input() realpricecc: any;

  @Input() tax: any;
  @Input() admin_fee: any;

  isValidFormSubmitted: Boolean = null;
  bannerId;
  slugdetail;
  today: number = Date.now();
  checkboxempthy = true;
  checkboxadded = false;
  cash: boolean = null;
  credit: boolean = null;
  bestdealatm: boolean = false;
  bestdealmbanking: boolean = false;
  bestdeallocalstore: boolean = false;
  bestdealcc: boolean = false;
  paymentcode: any;
  datacc: any;
  redirect_link: any;

  data: string;
  step2: boolean = true;
  step3: boolean = false;
  cc: boolean = null;
  localstore: boolean = null;
  mbanking: boolean = null;
  atm: boolean = null;

  paymentmetod = new FormGroup({
      bank : new FormControl (Validators.required)
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    if (this.realpriceatm > 1) {
      this.atm = true;
    }  else {
      this.atm = false;
    }

    if (this.realpricembanking > 1) {
      this.mbanking = true;
    } else {
      this.mbanking = false;
    }

    if (this.realpricelc > 1) {
      this.localstore = true;
    } else {
      this.localstore = false;
    }

    if (this.realpricecc > 1 ) {
      this.cc = true;
    } else {
      this.cc = false;
    }


    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );

    this.checkBestDeal();
  }

  checkBestDeal() {
    const minimalValue = Math.min(this.pricevalueatms, this.pricevaluembankings, this.pricevaluecreditcards, this.pricevaluelocalstores);

    if (this.pricevalueatms == minimalValue) {
      this.bestdealatm = true;
    }
    if (this.pricevaluembankings == minimalValue) {
      this.bestdealmbanking = true;
    }
    if (this.pricevaluecreditcards == minimalValue) {
      this.bestdealcc = true;
    }
    if (this.pricevaluelocalstores == minimalValue) {
      this.bestdeallocalstore = true;
    }
  }

  change() {
    this.cash = true;
    this.credit = false;
    this.checkboxadded = true;
    this.checkboxempthy = false;
  }

  changecredit() {
    this.credit = true;
    this.cash = false;
    this.checkboxadded = true;
    this.checkboxempthy = false;
  }

  loadshow: boolean = true;
  cashdisable: boolean = false;
  trx_id: any;
  amount: any;
  onSubmitPaymentMethod(form: NgForm) {
      this.cashdisable = true;
      this.cash = false;
      this.credit = false;
    if (this.paymentmetod.valid) {
      if ( this.paymentmetod.value.bank === 'creditcard') {
          this.isValidFormSubmitted = true;
          const valuecc = form.value;
          let a: any = this.slugdetail;
          valuecc.trx_amount = this.pricevaluecreditcards.toString();
          valuecc.cust_email = this.emailvalue;
          valuecc.cust_msisdn = this.phonevalue;
          valuecc.package_id = this.order_num.order_item.package_id;
          valuecc.bank = this.paymentmetod.value.bank;
          valuecc.success_redirect_url = window.location.origin + '/paket-wisata/' + a + '/etiket';
          valuecc.failed_redirect_url =  window.location.origin + '/paket-wisata/' + a + '/paymentfailed';

          // this.http.post(`https://uzonetravel-api.stagingapps.net/api/v1/payment/finpaycc/get-link?email=${this.emailvalue}&order_num=${this.order_num.order_num}`, valuecc)
          this.http.post(`${environment.api.url}/payment/finpaycc/get-link?email=${this.emailvalue}&order_num=${this.order_num.order_num}`, valuecc)
          .subscribe(value => {
              this.redirect_link = value.json().data.redirect_url;
              this.datacc = value.json().data;
              this.trx_id = value.json().data.transaction_detail.trx_id;
              this.amount = value.json().data.transaction_detail.total_price;
              window.location.href = this.redirect_link;
          });
        } else {
          this.isValidFormSubmitted = true;
          const value = form.value;
          value.package_id = this.order_num.order_item.package_id;
          value.cust_msisdn = this.phonevalue;
          value.cust_email = this.emailvalue;
          value.trx_amount = this.pricevalueatms.toString();
          let a: any = this.paymentmetod.value.bank;

          // this.http.post(`https://uzonetravel-api.stagingapps.net/api/v1/payment/finpayatm/get-payment-code?email=${this.emailvalue}&order_num=${this.order_num.order_num}`, value)
          this.http.post(`${environment.api.url}/payment/finpayatm/get-payment-code?email=${this.emailvalue}&order_num=${this.order_num.order_num}`, value)
          .subscribe(value => {
            this.paymentcode = value.json().data;

            if (this.paymentmetod.value.bank === 'bca' || this.paymentmetod.value.bank === 'bni'  || this.paymentmetod.value.bank === 'bri' ||
                this.paymentmetod.value.bank === 'mandiri' || this.paymentmetod.value.bank === 'cimb' || this.paymentmetod.value.bank === 'permatabank' ||
                this.paymentmetod.value.bank === 'M-Banking BCA' || this.paymentmetod.value.bank === 'M-Banking BRI' || this.paymentmetod.value.bank === 'M-Banking MANDIRI' ||
                this.paymentmetod.value.bank === 'M-Banking BNI' || this.paymentmetod.value.bank === 'Alfamart' || this.paymentmetod.value.bank === 'Indomaret' )
            // tslint:disable-next-line:one-line
            {
              this.step3 = true;
              this.step2 = false;
            }
          });
        }
    } else {
      this.isValidFormSubmitted = false;
      return;
    }
  }

  setDefaultValues() {
    this.paymentmetod.patchValue({ selector: 'credit' });
  }

  elsecredit() {
    this.paymentmetod.patchValue({ selector: 'indoalmart' });
  }

  goback() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/order');
    window.location.reload();
  }
}
