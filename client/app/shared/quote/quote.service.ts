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
    console.log(`Creating quote ${quote}`);
    return this.http.post('/api/quote', JSON.stringify(quote), this.options);
  }

  updateQuote(quote: Quote): Observable<any> {
    console.log(`Updating quote ${quote}`);
    return this.http.put(`/api/quote/${quote._id}`, JSON.stringify(quote), this.options);
  }

  sendQuoteEmail(quote: Quote, attachment: any): Observable<any> {
    console.log(`Sending email for quote ${quote}`);
    return this.http.post(`/api/sendQuoteEmail`, JSON.stringify(quote), this.options).map(res => res.json());
  }

  getQuotes(): Observable<any> {
    console.log('Getting quotes');
    return this.http.get('/api/quotes').map(res => res.json());
  }
}
