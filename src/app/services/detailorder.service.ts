import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { DetailOrderResponse } from '../models/detailorder_response';
import { Detailorder } from '../models/detailorder';

@Injectable()
export class DetailorderService extends BaseService {

  constructor(private http: Http) { super(); }

  getdetailorder(packageid: string): Observable<DetailOrderResponse> {
    return this.http.get(`${this.API_PATH}/tour-packages/detail/${packageid}`)
    .map((response:Response) => {
      var detailtoursRess = new DetailOrderResponse;
      detailtoursRess.detailmyorder =  response.json();
      return detailtoursRess;
    })            
  }
  
}
