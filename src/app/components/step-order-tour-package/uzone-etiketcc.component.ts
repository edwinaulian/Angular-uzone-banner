import { Component, OnInit, Input } from '@angular/core';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'uzone-etiketcc',
  templateUrl: './uzone-etiketcc.component.html',

  styles: []
})

export class UzoneEtiketccComponent implements OnInit {
  @Input() bannerDetail: DetailtourResponse;
  @Input() trx_idcc: any;
  @Input() amountcc: any;
  slugdetail;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    )
  }

  myorder() {
    this.router.navigateByUrl('/paket-wisata/'+this.slugdetail+'/Detailorder?invoice='+this.trx_idcc+'&amount='+this.amountcc+'');
    window.location.reload();
  }

  goback() {
    this.router.navigateByUrl('paket-wisata/'+this.slugdetail+'/cekstatus');
    window.location.reload();
  }

}
