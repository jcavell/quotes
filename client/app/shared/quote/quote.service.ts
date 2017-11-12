import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Quote, QuoteItem, QuoteRecord} from "./quote.model";
import {Options} from "../common/options";
// import 'rxjs/add/operator/do';  // for debugging


@Injectable()
export class QuoteService {
  private opts = new Options();
  constructor(private http: Http) {}


  search(terms: Observable<string>, params): Observable<[QuoteRecord[], number]> {
    console.log('Search called');
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .filter(term => term.length > 1)
      .switchMap(term => {
        params['searchField'] = 'multi';
        params['searchValue'] = term;
        return Observable.zip(this.getQuoteRecords(params, 1), this.getQuoteCount(params));
      });
  }

  getQuoteRecords(params, page: number): Observable<QuoteRecord[]> {
    console.log('Getting quote records for page ' + page);
    params['page'] = page;
    return this.http.get('http://localhost:9000/quotes', this.opts.getOptions(params)).map(res => res.json());
  }

  getQuoteCount(params): Observable<number> {
    console.log('Getting quote count');
    return this.http.get('http://localhost:9000/quote-count', this.opts.getOptions(params)).map(res => res.json());
  }

  getLineItems(quoteId: number): Observable<QuoteItem[]> {
    return this.http.get('http://localhost:9000/quotes/' + quoteId + '/line-items')
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  upsertQuoteItem(quoteItem: QuoteItem): Observable<QuoteItem> {
    console.log('Upsert quote item ' + JSON.stringify(quoteItem));
    const action = quoteItem.id ?
      this.http.put(`http://localhost:9000/quote-line-items/${quoteItem.id}`, JSON.stringify(quoteItem), this.opts.getOptions()) :
      this.http.post(`http://localhost:9000/quote-line-items`, JSON.stringify(quoteItem), this.opts.getOptions());

    return action.map(res => res.json());
  }

  deleteQuoteItem(quoteItemId: number): Observable<QuoteItem> {
      return this.http.delete(`http://localhost:9000/quote-line-items/${quoteItemId}`, this.opts.getOptions()).map(res => res.json());
  }

  updateQuote(quote: Quote): Observable<Quote> {
    return this.http.put(`http://localhost:9000/quotes/${quote.id}`, JSON.stringify(quote), this.opts.getOptions())
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

