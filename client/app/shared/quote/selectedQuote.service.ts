import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {Quote} from "./quote.model";
import {QuoteRequest} from "../quote-request/quoteRequest.model";

@Injectable()
export class SelectedQuoteService {

  // Observable selected quote source
  _selectedQuoteSource = new BehaviorSubject<[QuoteRequest, Quote]>([null, null]);
  selectedQuote$ = this._selectedQuoteSource.asObservable();

  // service command
  changeQuote(quoteRequestAndQuote: [QuoteRequest, Quote]) {
    // console.log(`Changing quote to ${JSON.stringify(quoteRequestAndQuote[0].id)}`);
    this._selectedQuoteSource.next(quoteRequestAndQuote);
  }

}

