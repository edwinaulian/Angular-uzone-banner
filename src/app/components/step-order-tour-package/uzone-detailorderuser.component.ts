import { Component, OnInit, Input } from '@angular/core';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'uzone-detailorder',
  templateUrl: './uzone-detailorderuser.component.html',
  styles: []
})

export class DetailpemesananComponent implements OnInit {
  today: number = Date.now();
  slugdetail;
  @Input() paymentcode: any;
  @Input() bannerDetail: DetailtourResponse;

  constructor( private router: Router, private _location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    );
  }

  goback() {
    this.router.navigateByUrl('paket-wisata/' + this.slugdetail + '');
    window.location.reload();
  }
}
