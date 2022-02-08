import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Http } from '@angular/http';
import { DetailtourService } from '../../services/detailtour.service';
import { Detailordertransres } from '../../models/detilordertrans_response';
import swal from 'sweetalert2';

@Component({
  selector: 'uzone-thirtystep',
  templateUrl: './uzone-thirtystep.component.html',
  styles: []
})
export class UzoneThirtystepComponent implements OnInit {
  @Input() bannerDetail: DetailtourResponse;
  @Input() paymentcode: any;
  atmbca: boolean = false;
  atmbni: boolean = false;
  atmbri: boolean = false;
  atmmandiri: boolean = false;
  atmcimb: boolean = false;
  atmpermatabank: boolean = false;
  mbbca: boolean = false;
  mbbri: boolean = false;
  mbmandiri: boolean = false;
  mbbni: boolean = false;
  alfamart: boolean = false;
  indomaret: boolean = false;
  cpatm: boolean = false;
  cplocalstore: boolean = false;
  step3cekstatus: boolean = false;
  orderDetail: Detailordertransres;
  slugdetail;
  trx_id;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: Http,
    private serviceDetail: DetailtourService,
    ) { }

  ngOnInit() {
    window.localStorage['paymentcode'] = JSON.stringify(this.paymentcode);
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );

    if ( this.paymentcode.transaction_detail.bank === 'bca' ) {
      this.atmbca = true;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'bni' ) {
      this.atmbca = false;
      this.atmbni = true;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'bri' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = true;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'mandiri' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = true;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'cimb' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = true;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'permatabank' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = true;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'M-Banking BCA' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = true;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'M-Banking BRI' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = true;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'M-Banking MANDIRI' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = true;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'M-Banking BNI' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = true;

      this.alfamart = false;
      this.indomaret = false;

      this.cpatm = true;
      this.cplocalstore = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'Alfamart' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = true;
      this.indomaret = false;

      this.cplocalstore = true;
      this.cpatm = false;
    } else if ( this.paymentcode.transaction_detail.bank === 'Indomaret' ) {
      this.atmbca = false;
      this.atmbni = false;
      this.atmbri = false;
      this.atmmandiri = false;
      this.atmcimb = false;
      this.atmpermatabank = false;

      this.mbbca = false;
      this.mbbri = false;
      this.mbmandiri = false;
      this.mbbni = false;

      this.alfamart = false;
      this.indomaret = true;

      this.cplocalstore = true;
      this.cpatm = false;
    }
   }

  cekstatus() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/cekstatus?invoice=' + this.paymentcode.transaction_detail.trx_id + '&amount=' + this.paymentcode.transaction_detail.total_price);
    window.location.reload();
  }

  text: any = {
    'Weeks': 'Weeks',
    'Days': 'Days',
    'Hours': ':',
     Minutes: ':',
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

    goback() {
      this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/order');
      window.location.reload();
    }
}
