import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {QuoteLineItem, QuoteRecord} from "./quote.model";
// import 'rxjs/add/operator/do';  // for debugging


@Injectable()
export class QuoteService {

  constructor(private http: Http) {}

  getQuotes(queryParams): Observable<QuoteRecord[]> {
    return this.http.get('http://localhost:9000/quotes', {'params' : queryParams})
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  getLineItems(quoteId: number): Observable<QuoteLineItem[]> {
    return this.http.get('http://localhost:9000/quotes/' + quoteId + '/line-items')
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }


  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

