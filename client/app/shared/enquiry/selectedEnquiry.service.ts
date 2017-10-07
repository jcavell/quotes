import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {NQuoteWithProducts} from "./enquiry.model";

@Injectable()
export class SelectedEnquiryService {

  _selectedEnquiriesource = new BehaviorSubject<NQuoteWithProducts>(null);
  selectedEnquiry$ = this._selectedEnquiriesource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  changeEnquiry(enquiry: NQuoteWithProducts) {
    this._selectedEnquiriesource.next(enquiry);
  }
}

