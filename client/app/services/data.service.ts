import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getXsells(): Observable<any> {
    return this.http.get('/api/xsells').map(res => res.json());
  }

  countXsells(): Observable<any> {
    return this.http.get('/api/xsells/count').map(res => res.json());
  }

  addXsell(xsell): Observable<any> {
    return this.http.post('/api/xsell', JSON.stringify(xsell), this.options);
  }

  getXsell(xsell): Observable<any> {
    return this.http.get(`/api/xsell/${xsell._id}`, this.options);
  }

  editXsell(xsell): Observable<any> {
    return this.http.put(`/api/xsell/${xsell._id}`, JSON.stringify(xsell), this.options);
  }

  deleteXsell(xsell): Observable<any> {
    return this.http.delete(`/api/xsell/${xsell._id}`, this.options);
  }

}
