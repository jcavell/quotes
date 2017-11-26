import {Component, EventEmitter, Input, Output} from "@angular/core";

import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {Quote} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";
import {IAlert} from "../shared/customer/customer.alert";

@Component({
  selector: 'edit-quote',
  templateUrl: './editQuoteComponent.html',
})
export class EditQuoteComponent {
  private modalRef: NgbModalRef;
  closeResult: string;
  @Input() quote: Quote;
  @Input() requiredDate;
  @Input() newNote: string;
  @Output() onAlertCreated = new EventEmitter<IAlert>();


  constructor(private modalService: NgbModal, public quoteService: QuoteService) {}

  open(content) {
    const parsedDate = new Date (this.quote.requiredDate);
    this.requiredDate = {year: parsedDate.getFullYear(), month: parsedDate.getMonth() + 1, day: parsedDate.getDate()};
    this.modalRef = this.modalService.open(content, {size: 'lg', beforeDismiss: this.reset, keyboard : false});
  }

  reset() {
    return true;
  }

  updateQuote(quote: Quote) {

    this.quote.requiredDate = new Date(this.requiredDate.year, this.requiredDate.month - 1, this.requiredDate.day).toISOString().split('.')[0] + 'Z';

    if (this.newNote) {
      this.quote.notes.push(this.newNote);
    }
    this.quoteService.updateQuote(quote).subscribe(
      res => {
        this.onAlertCreated.emit({
          type: 'success',
          message: ('Quote updated')
        });
        this.modalRef.close();
      },
      error => {
        this.onAlertCreated.emit({
          type: 'danger',
          message: ('Error: ' + JSON.stringify(error))
        });
        this.modalRef.close();
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
