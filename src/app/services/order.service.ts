import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from './base.service';
import { DetailtourResponse } from '../models/detailtour_response';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService extends BaseService {

  constructor(private http: Http) { super(); }

  adddatalogin(data) {
    return this.http.post(`${this.API_PATH}/orders/create`, JSON.stringify(data));
  }

  getpaymentcode(email: string, order_num: string) {
    return this.http.post(`${this.API_PATH}/payment/finpayatm/get-payment-code?email=${email}&order_num=${order_num}`, JSON.stringify(email && order_num));
  }
}