import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {ASIQuote} from "./ASIQuote.model";

@Injectable()
export class ASIQuoteService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  addQuote(quote: ASIQuote): Observable<any> {
    console.log(`Creating quote ${quote}`);
    return this.http.post('/api/quote', JSON.stringify(quote), this.options);
  }

  updateQuote(quote: ASIQuote): Observable<any> {
    console.log(`Updating quote ${quote}`);
    return this.http.put(`/api/quote/${quote._id}`, JSON.stringify(quote), this.options);
  }

  sendQuoteEmail(quote: ASIQuote, attachment: any): Observable<any> {
    console.log(`Sending email for quote ${quote}`);
    return this.http.post(`/api/sendQuoteEmail`, JSON.stringify(quote), this.options).map(res => res.json());
  }

  getQuotes(): Observable<any> {
    console.log('Getting quotes');
    return this.http.get('/api/quotes').map(res => res.json());
  }
}
