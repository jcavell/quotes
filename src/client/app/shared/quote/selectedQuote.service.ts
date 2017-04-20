import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {Quote} from "./quote.model";

@Injectable()
export class SelectedQuoteService {

  // Observable selected quote source
  _selectedQuoteSource = new BehaviorSubject<number>(0);
  selectedQuote$ = this._selectedQuoteSource.asObservable();

  // service command
  changeQuote(quote: Quote) {
    console.log('Changing quote to ' + quote.id);
    this._selectedQuoteSource.next(quote.id);
  }

}

