import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {NQuoteWithProducts} from "./quoteRequest.model";

@Injectable()
export class SelectedQuoteRequestService {

  _selectedQuoteRequestSource = new BehaviorSubject<NQuoteWithProducts>(null);
  selectedQuoteRequest$ = this._selectedQuoteRequestSource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  changeQuoteRequest(quoteRequest: NQuoteWithProducts) {
    this._selectedQuoteRequestSource.next(quoteRequest);
  }
}

