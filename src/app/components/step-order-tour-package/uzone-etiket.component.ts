import { Component, OnInit, Input } from '@angular/core';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'uzone-etiket',
  templateUrl: './uzone-etiket.component.html',
  styles: []
})

export class UzoneEtiketComponent implements OnInit {
  @Input() paymentcode: any;
  @Input() bannerDetail: DetailtourResponse;
  @Input() trx_id: any;
  @Input() amount: any;

  slugdetail;
  noncc: boolean = false;
  cc: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );
  }

  myorder() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/Pesanan?invoice=' + this.trx_id + '&amount=' + this.amount + '');
    window.location.reload();
  }

  goback() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '/cekstatus');
    window.location.reload();
  }
}
