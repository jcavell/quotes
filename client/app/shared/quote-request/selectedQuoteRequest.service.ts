import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {QuoteRequest} from "./quoteRequest.model";

@Injectable()
export class SelectedQuoteRequestService {

  // Observable selected quote source
  _selectedQuoteRequestSource = new BehaviorSubject<number>(0);
  selectedQuoteRequest$ = this._selectedQuoteRequestSource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  // service command
  changeQuote(quoteRequest: QuoteRequest) {
    console.log('Changing quote to ' + quoteRequest.id);
    this._selectedQuoteRequestSource.next(quoteRequest.id);
  }

}

