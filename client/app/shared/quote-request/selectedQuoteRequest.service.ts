import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {QuoteRequest} from "./quoteRequest.model";

@Injectable()
export class SelectedQuoteRequestService {

  // Observable selected quote source
  _selectedQuoteRequestSource = new BehaviorSubject<QuoteRequest>(null);
  selectedQuoteRequest$ = this._selectedQuoteRequestSource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  // service command
  changeQuoteRequest(quoteRequest: QuoteRequest) {
    // console.log('Changing quote to ' + JSON.stringify(quoteRequest));
    this._selectedQuoteRequestSource.next(quoteRequest);
  }
}

