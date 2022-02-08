import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { DetailtourResponse } from '../../models/detailtour_response';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { } from 'googlemaps';
import { FormGroup, FormControl, Validators, FormControlDirective } from '@angular/forms';
import { Detailtour } from '../../models/detailtour';
import {Location} from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'uzone-detailtourpackage',
  templateUrl: './uzone-detailtourpackage.component.html',
  styles: []
})
export class UzoneDetailtourpackageComponent implements OnInit {
  @ViewChild('googleMap') gmapElement: any;
  map: google.maps.Map;
  @Input() datas: Detailtour[];
  @Input() bannerDetail: DetailtourResponse;
  @Input() images: any[];
  @Input() facility: any[];
  @Input() description: any[];
  @Input() inclusive: any[];
  @Input() exclusive: any[];
  @Input() confirmation: any[];
  @Input() trip_description: any[];
  @Input() trip_plan: any[];
  @Input() add_information: any[];
  @Input() tips: any[];
  @Input() use_ticket: any[];
  @Input() opening_hours: any[];
  @Input() location: any[];
  @Input() canceled_policy: any[];
  @Input() otherpackagetour: any[];
  @Input() latitude: any;
  @Input() longitude: any;
  @Input() stock: any;
  @Input() percent_discount: any;
  number = 12.638467846;
  bannerId;
  slugdetail;
  ids;
  moreform: boolean = false;
  empstock: boolean = false;
  discpackage: boolean = true;
  discpage: boolean = true;
  show: true;
  disc: boolean = null;
  hide: boolean = false;
  
  public imageSources: DetailtourResponse[] = [
    this.bannerDetail
 ];
 
 public config: ICarouselConfig = {
   verifyBeforeLoad: true,
   log: false,
   animation: false,
   animationType: AnimationConfig.SLIDE,
   autoplay: false,
   autoplayDelay: 4000,
   stopAutoplayMinWidth: 768
 };
 
  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private _location: Location,
    private renderer: Renderer2,
    private elRef: ElementRef,
    ) {  }

  ngOnInit() 
  {     
    if  ( this.percent_discount == 0 ) {
      this.discpage = false;
      this.disc = false;
    } else {
      this.disc = true;
    }
    const div = this.renderer.createElement('div');
    this.gmap();
    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.slugdetail = param['id'];
      }
    )

    this.activatedRoute.params.subscribe(
      (param: Params) => {
        this.ids = param['id'];
      }
    )

    if (this.stock <= 5) {
        this.moreform = true;
        this.empstock = false;
    }
    if (this.stock == 0 ) {
        this.moreform = false;
        this.empstock = true;
    }
}

  ordernow() {
    if(this.stock == 0) {
      swal({
        type: 'info',
        text: 'Maaf Paket Tour ini sudah habis, silakan pilih paket lain.',
      });
    } else {
      this.router.navigateByUrl('/paket-wisata/'+this.slugdetail+'/order');
      window.location.reload();
    }
  }
  
  gmap() {
    var mapProp = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var marker = new google.maps.Marker({ position: mapProp.center });
    marker.setMap(this.map);  
    var infowindow = new google.maps.InfoWindow({
      content: "Hey, We are here"
    });
    infowindow.open(this.map, marker);
  }

  reloadpage() {
    window.top.location.reload();
  }

  backClicked() {
    this.router.navigateByUrl('/');
  }
 
}
 