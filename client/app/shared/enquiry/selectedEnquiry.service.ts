import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {Enquiry} from "./enquiry.model";

@Injectable()
export class SelectedEnquiryService {

  _selectedEnquirySource = new BehaviorSubject<Enquiry>(null);
  selectedEnquiry$ = this._selectedEnquirySource.asObservable();

  _isEditingSource = new BehaviorSubject<boolean>(false);
  isEditing$ = this._isEditingSource.asObservable();

  setEditing(isEditing: boolean) {
    this._isEditingSource.next(isEditing);
  }

  changeEnquiry(enquiry: Enquiry) {
    this._selectedEnquirySource.next(enquiry);
  }
}

