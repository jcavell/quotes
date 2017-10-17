import {Component, Input} from "@angular/core";

import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Quote} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";

@Component({
  selector: 'edit-quote',
  templateUrl: './editQuoteComponent.html'
})
export class EditQuoteComponent {
  closeResult: string;
  @Input() quote: Quote;
  @Input() theDate = { "year": "2017", "month": "2", "day": "25" };

  constructor(private modalService: NgbModal, public quoteService: QuoteService) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateQuote(quote: Quote) {
    console.log('Updating quote: ' + JSON.stringify(quote));
    this.quoteService.updateQuote(quote).subscribe(
      res => {
        // this.dismiss();
      },
      error => console.log('ERROR')
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
