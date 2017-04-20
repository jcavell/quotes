import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {QuoteRequest} from "./quoteRequest.model";

@Injectable()
export class SelectedQuoteRequestService {

  // Observable selected quote source
  _selectedQuoteRequestSource = new BehaviorSubject<number>(0);
  selectedQuoteRequest$ = this._selectedQuoteRequestSource.asObservable();

  // service command
  changeQuote(quoteRequest: QuoteRequest) {
    console.log('Changing quote to ' + quoteRequest.id);
    this._selectedQuoteRequestSource.next(quoteRequest.id);
  }

}

