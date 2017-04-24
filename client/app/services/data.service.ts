import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getReps(): Observable<any> {
    return this.http.get('/api/reps').map(res => res.json());
  }

  countReps(): Observable<any> {
    return this.http.get('/api/reps/count').map(res => res.json());
  }

  addRep(rep): Observable<any> {
    return this.http.post('/api/rep', JSON.stringify(rep), this.options);
  }

  getRep(rep): Observable<any> {
    return this.http.get(`/api/rep/${rep._id}`, this.options);
  }

  editRep(rep): Observable<any> {
    return this.http.put(`/api/rep/${rep._id}`, JSON.stringify(rep), this.options);
  }

  deleteRep(rep): Observable<any> {
    return this.http.delete(`/api/rep/${rep._id}`, this.options);
  }

}
