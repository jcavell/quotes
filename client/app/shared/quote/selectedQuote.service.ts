import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {Quote} from "./quote.model";
import {Enquiry} from "../enquiry/enquiry.model";

@Injectable()
export class SelectedQuoteService {

  _selectedQuoteSource = new BehaviorSubject<[Enquiry, Quote]>([null, null]);
  selectedQuote$ = this._selectedQuoteSource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  // service command
  changeQuote(enquiryAndQuote: [Enquiry, Quote]) {
    // console.log(`Changing quote to ${JSON.stringify(enquiryAndQuote[0].id)}`);
    this._selectedQuoteSource.next(enquiryAndQuote);
  }

}

