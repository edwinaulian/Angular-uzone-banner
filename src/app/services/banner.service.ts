import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { BannerResponse } from '../models/banner_response';
import { BaseService } from './base.service';
import { TermResponse } from '../models/termcondition_response';

@Injectable()
export class BannerService extends BaseService {

  constructor(private http: Http) { super(); }

  getdatabanner(): Observable<BannerResponse> {
    return this.http.get(`${this.API_PATH}/banner-promotions`)
    .map((response:Response) => {
      var bannersRes = new BannerResponse;
      bannersRes.banners = response.json();
      return bannersRes;
    })
  }

  gettermcondition(): Observable<TermResponse> {
    return this.http.get(`${this.API_PATH}/page/terms-and-conditions`)
    .map((response: Response) => {
      var termRes = new TermResponse;
      termRes.terms = response.json();
      return termRes;
    })
  }

}
