import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, NgForm, MinLengthValidator } from '@angular/forms';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { EventEmitter } from 'events';
import { Location } from '@angular/common';
import { ordervalue } from '../../models/order';
import {conformToMask} from 'angular2-text-mask';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'uzone-firststep',
  templateUrl: './uzone-firststep.component.html',
  styles: []
})
export class FirststepComponent implements OnInit {
  @Output() submitted = new EventEmitter();
  @Input() detailOrder: DetailtourResponse;
  @Input() bannerDetail: DetailtourResponse;
  @Input() display_price: any;
  @Input() stock: any;
  @Input() id: any;
  @Input() pricevalueatm: any;
  @Input() pricevaluembanking: any;
  @Input() pricevaluelocalstore: any;
  @Input() pricevaluecreditcard: any;
  @Input() realpriceatm: any;
  @Input() realpricembanking: any;
  @Input() realpricelc: any;
  @Input() realpricecc: any;
  @Input() name: any;
  @Input() tax: any;
  @Input() admin_fee: any;
  @Input() paymentcode: any;
  @Input() trx_id: any;
  @Input() atmpricem: any;

  bannerId;
  slugdetail;
  today: number = Date.now();
  minpaket: number = 1;
  maxpaket: number = 10;
  isValidFormSubmitted: Boolean = null;
  total: any = this.bannerDetail;
  public error: boolean = false;
  public errorplus: boolean = false;
  public errorstock: boolean = false;
  minfull: boolean = false;
  minnotfull: boolean = true;
  plusfull: boolean = false;
  plusnotfull: boolean = true;
  valueorder = new ordervalue();
  order: boolean = true;
  payment: boolean = false;
  btnenable: boolean = true;
  btndisable: boolean = false;
  btnenableval: boolean = false;
  stock1: boolean = false;
  ppn: boolean = null;
  freeppn: boolean = null;
  order_num: any;

  formIndentitas: FormGroup;

  constructor(
    private router: Router,
    private http: Http,
    private _location: Location,
    private activatedRoute: ActivatedRoute,
    ) {}



  ngOnInit() {
    this.formIndentitas = new FormGroup({
      package_id: new FormControl(this.id),
      price: new FormControl(this.display_price),
      priceatm: new FormControl(this.pricevalueatm),
      pricemb: new FormControl(this.pricevaluembanking),
      pricelc: new FormControl(this.pricevaluelocalstore),
      pricecc: new FormControl(this.pricevaluecreditcard),
      cust_title: new FormControl('', Validators.required),
      cust_name: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ])),
      num_of_package: new FormControl(1, [
        Validators.required,
        (control: AbstractControl) => Validators.max(this.maxpaket)(control)
      ]),
      display_price: new FormControl(this.display_price),
      pricevalueatm: new FormControl(),
      pricevaluembanking: new FormControl(),
      pricevaluelocalstore: new FormControl(),
      pricevaluecreditcard: new FormControl(),
    });

    if (this.stock == 1) {
      let stok: any = this.stock;
      let judul: any = this.name;
      swal({
        type: 'info',
        text: 'Paket ' + judul + ' hanya tersedia ' + stok + ' paket, untuk pemesanan lebih dari ' + stok + ' paket silakan hubungi Travel Agent via Chat yang sudah disediakan',
      });
      this.plusnotfull = false;
      this.plusfull = true;
      this.minfull = true;
      this.minnotfull = false;
      this.stock1 = true;
      this.formIndentitas.controls['num_of_package'].setValue(this.stock);
    }

    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );
    let packageid, displayprice, priceatms, pricembanking, pricelocalstore, pricecreditcard, pricedisc, pricedisca, pricediscb, pricediscc, pricediscd: any;
    packageid = this.formIndentitas.controls['package_id'].setValue(this.id);
    displayprice = this.formIndentitas.controls['display_price'].setValue(this.display_price);
    priceatms = this.formIndentitas.controls['pricevalueatm'].setValue(this.formIndentitas.value.pricevalueatm);
    pricembanking = this.formIndentitas.controls['pricevaluembanking'].setValue(this.pricevaluembanking);
    pricelocalstore = this.formIndentitas.controls['pricevaluelocalstore'].setValue(this.pricevaluelocalstore);
    pricecreditcard = this.formIndentitas.controls['pricevaluecreditcard'].setValue(this.pricevaluecreditcard);
    pricedisc = this.formIndentitas.controls['price'].setValue(this.display_price);
    pricedisca = this.formIndentitas.controls['priceatm'].setValue(this.pricevalueatm);
    pricediscb = this.formIndentitas.controls['pricemb'].setValue(this.pricevaluembanking);
    pricediscc = this.formIndentitas.controls['pricelc'].setValue(this.pricevaluelocalstore);
    pricediscd = this.formIndentitas.controls['pricecc'].setValue(this.pricevaluecreditcard);

    if (this.tax == false && this.admin_fee == false) {
      let addtaxoninit: any = this.display_price * 0.1;
      let tottaxoninit: any = this.display_price + addtaxoninit;
      let totaltaxadminoninit: any = Math.round(tottaxoninit + 3000);
      this.formIndentitas.controls['pricevalueatm'].setValue(totaltaxadminoninit);
      this.pricevalueatm = totaltaxadminoninit;
      this.ppn = true;
      this.freeppn = false;
    } else if (this.tax == true && this.admin_fee == true) {
      this.formIndentitas.controls['pricevalueatm'].setValue(this.display_price);
      this.pricevalueatm = this.display_price;
      this.ppn = false;
      this.freeppn = true;
    } else if (this.tax == false && this.admin_fee == true) {
      let addtaxoninit: any = this.display_price * 0.1;
      let tottaxoninit: any = Math.round(this.display_price + addtaxoninit);
      this.formIndentitas.controls['pricevalueatm'].setValue(tottaxoninit);
      this.pricevalueatm = tottaxoninit;
      this.ppn = true;
      this.freeppn = false;
    } else if (this.tax == true && this.admin_fee == false) {
      let adminonly: any = Math.round(this.display_price + 3000);
      this.formIndentitas.controls['pricevalueatm'].setValue(adminonly);
      this.pricevalueatm = adminonly;
      this.ppn = true;
      this.freeppn = false;
    }
    // console.log('halo atm', this.formIndentitas.value.pricevalueatm);

    if (this.tax == false && this.admin_fee == false) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = this.display_price + addtax;
      let totaltaxadmin: any = Math.round(tottax + 3000);
      this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
      this.pricevaluembanking = totaltaxadmin;
    } else if ( this.tax == true && this.admin_fee == true ) {
      this.formIndentitas.controls['pricevaluembanking'].setValue(this.display_price);
      this.pricevaluembanking = this.display_price;
    } else if ( this.tax == true && this.admin_fee == false ) {
      let totaltaxadmin: any = Math.round(this.display_price + 3000);
      this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
      this.pricevaluembanking = totaltaxadmin;
    } else if ( this.tax == false && this.admin_fee == true ) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = Math.round(this.display_price + addtax);
      this.formIndentitas.controls['pricevaluembanking'].setValue(tottax);
      this.pricevaluembanking = tottax;
    }
    // console.log('halo mbank', this.formIndentitas.value.pricevaluembanking);

    if (this.tax == false && this.admin_fee == false) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = this.display_price + addtax;
      let totaltaxadmin: any = Math.round(tottax + 3000);
      this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
      this.pricevaluelocalstore = totaltaxadmin;
    } else if ( this.tax == true && this.admin_fee == true ) {
      this.formIndentitas.controls['pricevaluelocalstore'].setValue(this.display_price);
      this.pricevaluelocalstore = this.display_price;
    } else if ( this.tax == true && this.admin_fee == false ) {
      let totaltaxadmin: any = Math.round(this.display_price + 3000);
      this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
      this.pricevaluelocalstore = totaltaxadmin;
    } else if ( this.tax == false && this.admin_fee == true ) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = Math.round(this.display_price + addtax);
      this.formIndentitas.controls['pricevaluelocalstore'].setValue(tottax);
      this.pricevaluelocalstore = tottax;
    }
    // console.log('halo local store', this.formIndentitas.value.pricevaluelocalstore);

    if (this.tax == false && this.admin_fee == false ) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = this.display_price + addtax;
      let precentage: any = 2.6 / 100;
      let precentageme: any = this.display_price * precentage;
      let totaltaxadmin: any = Math.round(tottax + precentageme + 2000);
      this.formIndentitas.controls['pricevaluecreditcard'].setValue(totaltaxadmin);
      this.pricevaluecreditcard = totaltaxadmin;
    } else if (this.tax == true && this.admin_fee == true) {
      this.formIndentitas.controls['pricevaluecreditcard'].setValue(this.display_price);
      this.pricevaluecreditcard = this.display_price;
    } else if (this.tax ==  true && this.admin_fee == false) {
      let precentage: any = 2.6 / 100;
      let totalprecentage: any = Math.round((this.display_price * precentage) + 2000);
      this.formIndentitas.controls['pricevaluecreditcard'].setValue(totalprecentage);
      this.pricevaluecreditcard = totalprecentage;
    } else if (this.tax ==  false && this.admin_fee == true) {
      let addtax: any = this.display_price * 0.1;
      let tottax: any = Math.round(this.display_price + addtax);
      this.formIndentitas.controls['pricevaluecreditcard'].setValue(tottax);
      this.pricevaluecreditcard = tottax;
    }
    // console.log('halo credit card', this.formIndentitas.value.pricevaluecreditcard);
  }

  private getFullNamePattern() {
    return '^[a-z A-Z]$';
  }

  private getEmailPattern() {
    return '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  }

  private getPhoneNumberPattern() {
    return /^-?(0|[1-9]\d*)?$/;
  }

  public input_phone = '';
  // public phoneMask = [ /\d/,/\d/,/\d/, '-',/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public conformedPhoneNumber = conformToMask(
    this.input_phone,
    this.phoneMask,
    {guide: true,
    showMask: true
    }
  );

  numberOnly(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 49 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberOnlys(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  charOnlys(event: any): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 32 && ( charCode > 122 || charCode < 65 )) {
      return false;
    }
    return true;
  }


  minnumber() {
    let jmlpket = 1;
    let addtax, tottax, totaltaxadmin, totaltaxadmincc: any;
    jmlpket = this.formIndentitas.value.num_of_package;
    if ( jmlpket > 1) {
      let jumlahpaket: any;
      jumlahpaket = jmlpket - 1;
      this.formIndentitas.controls['num_of_package'].setValue(jumlahpaket);

      // Display Price harga awal setelah diskon
      let tot, hasilakhir: any;
      tot = this.formIndentitas.value.price;
      hasilakhir =  jumlahpaket * tot;
      this.formIndentitas.controls['display_price'].setValue(hasilakhir);

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhir * 0.1;
        tottax = hasilakhir + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevalueatm'].setValue(totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        let hasilakhirdisplayprice: any = Math.round(jumlahpaket * tot);
        this.formIndentitas.controls['pricevalueatm'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhir + 3000);
        this.formIndentitas.controls['pricevalueatm'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhir * 0.1;
        tottax = Math.round(hasilakhir + addtax);
        this.formIndentitas.controls['pricevalueatm'].setValue(tottax);
      }

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhir * 0.1;
        tottax = hasilakhir + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        let hasilakhirdisplayprice: any = Math.round(jumlahpaket * tot);
        this.formIndentitas.controls['pricevaluembanking'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhir + 3000);
        this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhir * 0.1;
        tottax = Math.round(hasilakhir + addtax);
        this.formIndentitas.controls['pricevaluembanking'].setValue(tottax);
      }

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhir * 0.1;
        tottax = hasilakhir + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        let hasilakhirdisplayprice: any = Math.round(jumlahpaket * tot);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhir + 3000);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhir * 0.1;
        tottax = Math.round(hasilakhir + addtax);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(tottax);
      }

      if (this.tax == false && this.admin_fee == false ) {
        addtax = hasilakhir * 0.1;
        tottax = hasilakhir + addtax;
        let precentage: any = 2.6 / 100;
        let precentageme: any = hasilakhir * precentage;
        totaltaxadmin = Math.round(tottax + precentageme + 2000);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(totaltaxadmin);
      } else if (this.tax == true && this.admin_fee == true) {
        let hasilakhirdisplayprice: any = Math.round(jumlahpaket * tot);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(hasilakhirdisplayprice);
      } else if (this.tax ==  true && this.admin_fee == false) {
        let precentage: any = 2.6 / 100;
        let totalprecentage: any = Math.round((hasilakhir * precentage) + 2000);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(totalprecentage);
      } else if (this.tax ==  false && this.admin_fee == true) {
        addtax = hasilakhir * 0.1;
        tottax = Math.round(hasilakhir + addtax);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(tottax);
      }
    } else if ( jmlpket <= 1 ) {
      swal({
        type: 'error',
        text: 'Jumlah Pembelian Paket minimal 1',
      });
      this.minfull = true;
      this.minnotfull = false;
    }
    if ( jmlpket >= 1 ) {
      this.plusnotfull = true;
      this.plusfull = false;
    }
  }

  plusenumber() {
    let totaldisplayprice, hasilakhirdisplayprice: any;
    let jumlahpaket, addtax, tottax, totaltaxadmin: any;
    if ( this.formIndentitas.value.num_of_package > 0 ) {
      jumlahpaket = parseInt(this.formIndentitas.value.num_of_package) + 1;
      this.formIndentitas.controls['num_of_package'].setValue(jumlahpaket);
      totaldisplayprice = this.formIndentitas.value.price;
      hasilakhirdisplayprice = jumlahpaket * totaldisplayprice;
      this.formIndentitas.controls['display_price'].setValue(hasilakhirdisplayprice);

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = hasilakhirdisplayprice + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevalueatm'].setValue(totaltaxadmin);
        // console.log('addtax atm', addtax);
        // console.log('hasilakhirdisplayprice atm', hasilakhirdisplayprice);
        // console.log('totaltaxadmin atm', totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        totaldisplayprice = this.formIndentitas.value.price;
        hasilakhirdisplayprice = Math.round(jumlahpaket * totaldisplayprice);
        this.formIndentitas.controls['pricevalueatm'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhirdisplayprice + 3000);
        this.formIndentitas.controls['pricevalueatm'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = Math.round(hasilakhirdisplayprice + addtax);
        this.formIndentitas.controls['pricevalueatm'].setValue(tottax);
      }
      // console.log('pricevalueatm', this.pricevalueatm);

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = hasilakhirdisplayprice + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
        // console.log('addtax mbanking', addtax);
        // console.log('hasilakhirdisplayprice mbanking', hasilakhirdisplayprice);
        // console.log('totaltaxadmin mbanking', totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        totaldisplayprice = this.formIndentitas.value.price;
        hasilakhirdisplayprice = Math.round(jumlahpaket * totaldisplayprice);
        this.formIndentitas.controls['pricevaluembanking'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhirdisplayprice + 3000);
        this.formIndentitas.controls['pricevaluembanking'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = Math.round(hasilakhirdisplayprice + addtax);
        this.formIndentitas.controls['pricevaluembanking'].setValue(tottax);
      }
      // console.log('pricevaluembanking', this.pricevaluembanking);

      if (this.tax == false && this.admin_fee == false) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = hasilakhirdisplayprice + addtax;
        totaltaxadmin = Math.round(tottax + 3000);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
        // console.log('addtax local store', addtax);
        // console.log('hasilakhirdisplayprice local store', hasilakhirdisplayprice);
        // console.log('totaltaxadmin local store', totaltaxadmin);
      } else if ( this.tax == true && this.admin_fee == true ) {
        totaldisplayprice = this.formIndentitas.value.price;
        hasilakhirdisplayprice = Math.round(jumlahpaket * totaldisplayprice);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(hasilakhirdisplayprice);
      } else if ( this.tax == true && this.admin_fee == false ) {
        totaltaxadmin = Math.round(hasilakhirdisplayprice + 3000);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(totaltaxadmin);
      } else if ( this.tax == false && this.admin_fee == true ) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = Math.round(hasilakhirdisplayprice + addtax);
        this.formIndentitas.controls['pricevaluelocalstore'].setValue(tottax);
      }
      // console.log('pricevaluelocalstore', this.pricevaluelocalstore);

      if (this.tax == false && this.admin_fee == false ) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = hasilakhirdisplayprice + addtax;
        let precentage: any = 2.6 / 100;
        let precentageme: any = hasilakhirdisplayprice * precentage;
        totaltaxadmin = Math.round(tottax + precentageme + 2000);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(totaltaxadmin);
      } else if (this.tax == true && this.admin_fee == true) {
        totaldisplayprice = this.formIndentitas.value.price;
        hasilakhirdisplayprice = Math.round(jumlahpaket * totaldisplayprice);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(hasilakhirdisplayprice);
      } else if (this.tax ==  true && this.admin_fee == false) {
        let precentage: any = 2.6 / 100;
        let totalprecentage: any = Math.round((hasilakhirdisplayprice * precentage) + 2000);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(totalprecentage);
      } else if (this.tax ==  false && this.admin_fee == true) {
        addtax = hasilakhirdisplayprice * 0.1;
        tottax = Math.round(hasilakhirdisplayprice + addtax);
        this.formIndentitas.controls['pricevaluecreditcard'].setValue(tottax);
      }
    }

    if ( this.formIndentitas.value.num_of_package >= 10 ) {
      swal({
        type: 'error',
        text: 'Jumlah Pembelian Paket Maksimal 10',
      });
      this.formIndentitas.controls['num_of_package'].setValue(10);
      this.formIndentitas.controls['display_price'].setValue(hasilakhirdisplayprice);
    }

    if ( this.formIndentitas.value.num_of_package >= 10 && this.stock === 10 ) {
      swal({
        type: 'error',
        text: 'Jumlah Pembelian Paket Maksimal 10',
      });
      this.formIndentitas.controls['num_of_package'].setValue(10);
      this.formIndentitas.controls['display_price'].setValue(hasilakhirdisplayprice);
    }

    if (jumlahpaket >= this.stock) {
      let a: any = this.stock;
      // swal({
      //   type: 'error',
      //   text: 'Paket yang tersedia adalah '+ a +' Paket. Jumlah pemesanan yang anda inputkan tidak tersedia, mohon inputkan ulang atau pilih paket lain.',
      // });
      this.plusnotfull = false;
      this.plusfull = true;
      this.formIndentitas.controls['display_price'].setValue(hasilakhirdisplayprice);
      this.formIndentitas.controls['num_of_package'].setValue(this.stock);
    }

    if ( jumlahpaket >= 1 ) {
      this.minfull = false;
      this.minnotfull = true;
    }
    if (jumlahpaket >= 10 ) {
      this.minfull = false;
      this.minnotfull = true;
      this.plusfull = true;
      this.plusnotfull = false;
    }
  }

  onFormSubmit(form: NgForm) {
    this.btnenable = false;
    this.btndisable = true;
    this.btnenableval = false;
    if (this.formIndentitas.valid) {
      // console.log("Template-driven form submitted: ", this.formIndentitas);
      this.isValidFormSubmitted = true;
      let data = new URLSearchParams();
      const value = form.value;
      data = value;
      let a: any;
      a = this.valueorder.cust_name = this.formIndentitas.get('cust_name').value;
      this.valueorder.phone = this.formIndentitas.get('phone').value;
      if (this.formIndentitas.valid && this.display_price > 20000000) {
        swal({
          type: 'info',
          text: 'Maaf pemesanan Anda tidak bisa kami proses karena melebihi limit pembayaran. Jika Anda masih ingin melanjutkan pemesanan, silakan hubungi kami via live chat.',
        });
      this.router.navigateByUrl('/paket-wisata/' + this.slugdetail + '/order');
      this.payment = false;
      this.btnenableval = true;
      this.btndisable = false;
     } else {
      // this.http.post('https://uzonetravel-api.stagingapps.net/api/v1/orders/create', value).subscribe(value=> {
      this.http.post(environment.api.url + '/orders/create', value).subscribe(value => {
        // console.log(value.json().data.order_num)
        this.order_num = value.json().data;
        // console.log(this.order_num);
        this.payment = true;
        this.order = false;
      });
     }
      // this.http.post('https://uzonetravel-api.stagingapps.net/api/v1/orders/create', value).map(res => res.json());
      // this.router.navigateByUrl('/paket-wisata/'+this.slugdetail+'/payment');
      // window.location.reload();
    } else {
      this.isValidFormSubmitted = false;
      return;
    }
  }

  goback() {
    // this._location.back();
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '');
    window.location.reload();
  }
}
