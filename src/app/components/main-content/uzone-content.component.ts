import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DetailtourService } from '../../services/detailtour.service';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner';
import { Term } from '../../models/termconditon';
import { BannerResponse } from '../../models/banner_response';
import { TermResponse } from '../../models/termcondition_response';
import { DetailtourResponse } from '../../models/detailtour_response';
import { OrderService } from '../../services/order.service';
import { Detailtour } from '../../models/detailtour';
import { DetailOrderResponse } from '../../models/detailorder_response';
import { DetailorderService } from '../../services/detailorder.service';
import { Detailordertransres } from '../../models/detilordertrans_response';

@Component({
  selector: 'uzone-content',
  templateUrl: './uzone-content.component.html',
  styles: []
})
export class ContentComponent implements OnInit {
  failedpayment = false;
  pesanan = false;
  etiket = false;
  etiketcc = false;
  termcondition = false;
  detail = false;
  orderpesan = false;
  orderbayar = false;
  orderbayarcredit = false;
  orderproses = false;
  orderprosescekstatus = false;
  waiting = false;

  bannerLanding: Banner[];
  termconditionpage: Term;
  datas: Detailtour[];
  bannerDetail: DetailtourResponse;
  orderDetail: Detailordertransres;
  images: any[];
  facility: any[];
  description: any[];
  inclusive: any[];
  exclusive: any[];
  confirmation: any[];
  trip_plan: any[];
  add_information: any[];
  tips: any[];
  use_ticket: any[];
  opening_hours: any[];
  location: any[];
  canceled_policy: any[];
  detailOrder: DetailOrderResponse;
  otherpackagetour: any[];
  display_price: any;
  latitude: any;
  longitude: any;
  stock: any;
  percent_discount: any;
  id: any;
  pricevalueatm: any;
  pricevaluembanking: any;
  pricevaluelocalstore: any;
  pricevaluecreditcard: any;
  realpriceatm: any;
  realpricembanking: any;
  realpricelc: any;
  realpricecc: any;
  tax: any;
  admin_fee: any;
  name: any;
  cust_name: string;
  paymentcode: any;
  datacc: any;
  bank: any;
  payment_status: any;
  trx_ids;
  amounts;
  num_of_packagecc;
  payment_statuscc;
  amount;
  bannerId;
  slugdetail;
  trx_id;
  ids;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceDetail: DetailtourService,
    private serviceLanding: BannerService,
    private serviceOrder: OrderService,
    private serviceDetailOrder: DetailorderService,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
    });

    if (this.router.url.includes('/paket-wisata/' + this.slugdetail + '/paymentfailed')) {
      this.trx_id = this.activatedRoute.snapshot.queryParamMap.get('invoice');
      this.amount = this.activatedRoute.snapshot.queryParamMap.get('amount');
    }

    if (this.router.url.includes('/paket-wisata/' + this.slugdetail + '/etiket')) {
      this.trx_id = this.activatedRoute.snapshot.queryParamMap.get('invoice');
      this.amount = this.activatedRoute.snapshot.queryParamMap.get('amount');
    }
    if (this.router.url.includes('/paket-wisata/' + this.slugdetail + '/Pesanan')) {
      this.trx_id = this.activatedRoute.snapshot.queryParamMap.get('invoice');
      this.amount = this.activatedRoute.snapshot.queryParamMap.get('amount');
    }

    if (this.router.url.includes('/paket-wisata/' + this.slugdetail + '/cekstatus')) {
      this.trx_id = this.activatedRoute.snapshot.queryParamMap.get('invoice');
      this.amount = this.activatedRoute.snapshot.queryParamMap.get('amount');
    }

    if (this.router.url === '/') {
      this.detail = false;
      this.onLanding();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/order') {
      this.detail = this.slugdetail ? true : false;
      this.onDetailbyslug();
      this.contentorder();
      this.onimages();
      this.ongetdataordertrans();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/payment') {
      this.detail = this.slugdetail ? true : false;
      this.contentpayment();
      this.onDetailbyslug();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/proses') {
      this.detail = this.slugdetail ? true : false;
      this.contentproses();
      this.onimages();
      this.onDetailbyslug();
      this.ongetdataordertrans();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/cekstatus?invoice=' + this.trx_id + '&amount=' + this.amount + '') {
      this.contentprosescekstatus();
      this.onDetailbyslug();
      this.ongetdataordertrans();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/payment-creditcard') {
      this.detail = this.slugdetail ? true : false;
      this.contentpaymentcredit();
      this.onDetailbyslug();
    } else if (this.router.url === '/paket-wisata/term-condition') {
      this.contentermcondition();
      this.ontermcondition();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/waiting') {
      this.detail = this.slugdetail ? true : false;
      this.waitingpayment();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/etiket?invoice=' + this.trx_id + '&amount=' + this.amount + '') {
      this.etikets();
      this.onDetailbyslug();
      this.ongetdataordertrans();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/Pesanan?invoice=' + this.trx_id + '&amount=' + this.amount + '') {
      this.detail = this.slugdetail ? true : false;
      this.onDetailbyslug();
      this.ongetdataordertrans();
      this.pesanansaya();
    } else if (this.router.url === '/paket-wisata/' + this.slugdetail + '/paymentfailed?invoice=' + this.trx_id + '&amount=' + this.amount + '') {
      this.detail = this.slugdetail ? true : false;
      this.onDetailbyslug();
      this.ongetdataordertrans();
      this.failedpayments();
    } else  {
      this.activatedRoute.params.subscribe(
        (param: Params) => {
          this.slugdetail = param['id'];
          this.detail = this.slugdetail ? true : false;
          this.onDetailbyslug();
          this.onDetailotherpaket();
          this.onimages();
        }
      );
    }
  }

  failedpayments() {
    this.failedpayment = true;
    this.pesanan = false;
    this.etiket = false;
    this.orderpesan = false;
    this.detail = false;
    this.orderbayar = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = false;

  }

  pesanansaya() {
    this.pesanan = true;
    this.etiket = false;
    this.orderpesan = false;
    this.detail = false;
    this.orderbayar = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = false;
    this.failedpayment = false;
  }

  etikets() {
    this.etiket = true;
    this.orderpesan = false;
    this.detail = false;
    this.orderbayar = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  waitingpayment() {
    this.orderpesan = false;
    this.detail = false;
    this.orderbayar = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = true;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentorder() {
    this.orderpesan = true;
    this.detail = false;
    this.orderbayar = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentpayment() {
    this.orderbayar = true;
    this.detail = false;
    this.orderpesan = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.termcondition = false;
    this.waiting = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentpaymentcredit() {
    this.orderbayarcredit = true;
    this.orderbayar = false;
    this.detail = false;
    this.orderpesan = false;
    this.orderproses = false;
    this.orderprosescekstatus = false;
    this.waiting = false;
    this.termcondition = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentproses() {
    this.orderproses = true;
    this.orderbayar = false;
    this.detail = false;
    this.orderpesan = false;
    this.orderprosescekstatus = false;
    this.orderbayarcredit = false;
    this.waiting = false;
    this.termcondition = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentprosescekstatus() {
    this.orderprosescekstatus = true;
    this.orderproses = false;
    this.orderbayar = false;
    this.detail = false;
    this.orderpesan = false;
    this.orderbayarcredit = false;
    this.waiting = false;
    this.termcondition = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  contentermcondition() {
    this.termcondition = true;
    this.orderprosescekstatus = false;
    this.orderproses = false;
    this.orderbayar = false;
    this.detail = false;
    this.waiting = false;
    this.orderpesan = false;
    this.orderbayarcredit = false;
    this.etiket = false;
    this.pesanan = false;
    this.failedpayment = false;
  }

  onLanding() {
    this.serviceLanding.getdatabanner().subscribe((response: BannerResponse) => {
      this.bannerLanding = response.banners;
      this.slugdetail = this.bannerLanding['data'][0]['slug'];
    });
  }

  ontermcondition() {
    this.serviceLanding.gettermcondition().subscribe((response: TermResponse) => {
      this.termconditionpage = response.terms;
    });
  }

  onDetailbyslug() {
    this.serviceDetail.getdetail(this.slugdetail).subscribe((response: DetailtourResponse) => {
      this.bannerDetail = response;
    });
  }

  ongetdataordertrans() {
      this.serviceDetail.getdetailordertrans(this.trx_id).subscribe((response: any ) =>  {
        this.orderDetail = response;
        this.bank = response.detailordertrans.data.bank;
        this.payment_status = response.detailordertrans.data.payment_status;
      });
  }

  onDetailotherpaket() {
    this.serviceDetail.getdataotherpacket(this.slugdetail).subscribe((response: any) => {
      this.otherpackagetour = response.detailothertours.data;
    });
  }

  atmpricem: any;
  onimages() {
    this.serviceDetail.getdetail(this.slugdetail).subscribe((response: any) => {
      this.images = response.detailtours.data.images;
      this.facility = response.detailtours.data.facility;
      this.description = response.detailtours.data.description;
      this.inclusive = response.detailtours.data.information_activity.inclusive;
      this.exclusive = response.detailtours.data.information_activity.exclusive;
      this.confirmation = response.detailtours.data.information_activity.confirmation;
      this.trip_plan = response.detailtours.data.information_activity.trip_plan;
      this.add_information = response.detailtours.data.information_activity.add_information;
      this.tips = response.detailtours.data.information_activity.tips;
      this.use_ticket = response.detailtours.data.how_to_use.use_ticket;
      this.opening_hours = response.detailtours.data.how_to_use.opening_hours;
      this.location = response.detailtours.data.how_to_use.location;
      this.canceled_policy = response.detailtours.data.canceled_policy;
      this.display_price = response.detailtours.data.display_price;
      this.latitude = response.detailtours.data.latitude;
      this.longitude = response.detailtours.data.longitude;
      this.id = response.detailtours.data.id;
      this.stock = response.detailtours.data.stock;
      this.percent_discount = response.detailtours.data.percent_discount;
      this.pricevalueatm = response.detailtours.data.display_price;
      this.atmpricem = response.detailtours.data.display_price;
      this.pricevaluembanking = response.detailtours.data.display_price;
      this.pricevaluelocalstore = response.detailtours.data.display_price;
      this.pricevaluecreditcard = response.detailtours.data.display_price;
      this.realpriceatm = response.detailtours.data.atm.realprice;
      this.realpricembanking = response.detailtours.data.atm.realprice;
      this.realpricelc = response.detailtours.data.minimarket.realprice;
      this.realpricecc = response.detailtours.data.creditcard.realprice;
      this.tax = response.detailtours.data.tax;
      this.admin_fee = response.detailtours.data.admin_fee;
      this.name = response.detailtours.data.name;
    });
  }

  onOrder() {
    this.serviceDetailOrder.getdetailorder(this.slugdetail).subscribe((response: DetailOrderResponse) => {
      this.detailOrder = response;
    });
  }
}
