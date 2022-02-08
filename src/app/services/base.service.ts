import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseService {
  protected API_PATH = `${environment.api.url}`;
  protected APIARY_API_PATH = `${environment.api.apiaryUrl}`;
  constructor() { }

}
