import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Quote} from "./quote.model";

@Injectable()
export class QuoteService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  addQuote(quote: Quote): Observable<any> {
    console.log(`Saving quote ${quote.id}`);
    return this.http.post('/api/quote', JSON.stringify(quote), this.options);
  }

  getQuotes(): Observable<any> {
    return this.http.get('/api/quotes').map(res => res.json());
  }
}
