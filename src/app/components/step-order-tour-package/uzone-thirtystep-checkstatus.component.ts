import { Component, OnInit, Input } from '@angular/core';
import swal from 'sweetalert2';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'uzone-thirtystep-checkstatus',
  templateUrl: './uzone-thirtystep-checkstatus.componen.html',
  styles: []
})

export class UzoneThirtystepCheckstatusComponent implements OnInit {
  @Input() bannerDetail: DetailtourResponse;
  @Input() paymentcode: any;
  @Input() bank: any;
  @Input() trx_id: any;
  @Input() amount: any;
  @Input() payment_status: any;
  today: number = Date.now();
  slugdetail;
  cpatm: boolean = false;
  cplocalstore: boolean = false;
  todays: string = moment().locale('id').format('LL');

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );
    // this.http.get(`http://uzonetravel-api.stagingapps.net/api/v1/transactions/check-status/${this.trx_id}`);
    this.http.get(`${environment.api.url}/transactions/check-status/${this.trx_id}`);
    if ( this.payment_status === 'sukses') {
      this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/etiket?invoice=' + this.trx_id + '&amount=' + this.amount + '');
      window.location.reload();
    } else if ( this.payment_status === 'menunggu pembayaran' ) {
      this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/cekstatus?invoice=' + this.trx_id + '&amount=' + this.amount + '');
    }
    if (this.bank === 'bca' || this.bank === 'bni' || this.bank === 'bri' || this.bank === 'mandiri' || this.bank === 'cimb' || this.bank === 'permatabank' || this.bank === 'M-Banking BCA' || this.bank === 'M-Banking BRI' ||  this.bank === 'M-Banking MANDIRI' || this.bank === 'M-Banking BNI' ) {
      this.cpatm = true;
    } else {
      this.cplocalstore = true;
    }
  }

  text: any = {
    'Weeks': 'Weeks',
    'Days': 'Days',
    'Hours': ':',
    'Minutes': ':',
    'Seconds': '',
    'MilliSeconds': 'MilliSeconds' };

  copyText(val: string) {
    swal({
      type: 'info',
      text: 'Kode Pembayaran Berhasil Disalin',
    });
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

  stay() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/cekstatus');
    window.location.reload();
  }
}
