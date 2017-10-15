import {Component} from "@angular/core";

import {CloseGuard, DialogRef, ModalComponent} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {Quote} from "../shared/quote/quote.model";
import {QuoteService} from "../shared/quote/quote.service";

export class EditQuoteModalContext extends BSModalContext {
  public quote: Quote;
}


@Component({
  selector: 'edit-quote-modal',
  templateUrl: 'editQuote.component.html'
})
export class EditQuoteModalComponent implements CloseGuard, ModalComponent<EditQuoteModalContext> {
  context: EditQuoteModalContext;
  quote: Quote;


  constructor(public dialog: DialogRef<EditQuoteModalContext>, public quoteService: QuoteService) {
    this.context = dialog.context;
    this.quote = this.context.quote;
    dialog.setCloseGuard(this);
  }


  updateQuote(quote: Quote) {
    console.log('Updating quote: ' + JSON.stringify(quote));
    this.quoteService.updateQuote(quote).subscribe(
      res => {
        this.dismiss();
      },
      error => console.log('ERROR')
    );
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  close() {
    this.dialog.close();
  }

  dismiss() {
    this.dialog.dismiss();
  }
}
