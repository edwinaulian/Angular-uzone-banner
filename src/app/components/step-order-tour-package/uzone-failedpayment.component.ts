import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'uzone-failedpayment',
  templateUrl: './uzone-failedpayment.component.html',
  styles: []
})
export class UzoneFailedpaymentComponent implements OnInit {
  @Input() paymentcode: any;
  @Input() trx_id: any;

  slugdetail;
  test: any;


  constructor( private router: Router , private activatedRoute: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    // this.http.post(`https://uzonetravel-api.stagingapps.net/api/v1/payment/finpay-atm/uzone/callback/return-url/fail?invoice=${this.trx_id}`, '').subscribe(value => {
    this.http.post(`${environment.api.url}/payment/finpay-atm/uzone/callback/return-url/fail?invoice=${this.trx_id}`, '').subscribe(value => {
      this.test = value.json().data;
    });
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );
  }

  backtoorder() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/order');
    window.location.reload();
   }

  }
