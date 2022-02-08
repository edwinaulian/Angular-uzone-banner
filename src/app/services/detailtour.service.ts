import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { DetailtourResponse } from '../models/detailtour_response';
import { BaseService } from './base.service';
import { DetailOrderResponse } from '../models/detailorder_response';
import { DetailOPResponse } from '../models/detailotherpacket_response';
import { Detailorder } from '../models/detailorder';
import { Detailordertransres } from '../models/detilordertrans_response';

@Injectable()
export class DetailtourService extends BaseService {

  constructor(private http: Http) { super(); }

  getdetail(slug: string): Observable<DetailtourResponse> {
    return this.http.get(`${this.API_PATH}/tour-packages/detail/by-slug/${slug}`)
    .map((response:Response) => {
      var detailtour = new DetailtourResponse;
      detailtour.detailtours = response.json();
      return detailtour;
    })
  }

  getdataotherpacket(slug: string): Observable<DetailOPResponse> {
    return this.http.get(`${this.API_PATH}/tour-packages?slug=${slug}`)
    .map(( response: Response ) => {
      var dataother = new DetailOPResponse;
      dataother.detailothertours = response.json();
      return dataother;
    })
  }

  getdetailordertrans(trx_id: string): Observable<Detailordertransres> {
    return this.http.get(`${this.API_PATH}/transactions/detail/${trx_id}`)
    .map((response: Response) => {
      var datadetailorder = new Detailordertransres;
      datadetailorder.detailordertrans = response.json();
      return datadetailorder;
    })
  }

}
