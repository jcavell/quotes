import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Xsell} from "./xsell.model";

@Injectable()
export class XsellService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getXsells(): Observable<any> {
    return this.http.get('http://localhost:9000/xsells').map(res => res.json());
  }

  addXsell(xsell: Xsell): Observable<any> {
    return this.http.post('http://localhost:9000/xsells', xsell, this.options);
  }

  editXsell(xsell: Xsell): Observable<any> {
    return this.http.put(`http://localhost:9000/xsells/${xsell.id}`, JSON.stringify(xsell), this.options);
  }

  deleteXsell(xsell: Xsell): Observable<any> {
    return this.http.delete(`http://localhost:9000/xsells/${xsell.id}`, this.options);
  }
}
