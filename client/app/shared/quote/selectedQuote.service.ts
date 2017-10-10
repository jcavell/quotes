import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {QuoteRecord} from "./quote.model";

@Injectable()
export class SelectedQuoteService {

  _selectedQuoteSource = new BehaviorSubject<QuoteRecord>(null);
  selectedQuote$ = this._selectedQuoteSource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  changeQuote(qr: QuoteRecord) {
    this._selectedQuoteSource.next(qr);
  }
}

