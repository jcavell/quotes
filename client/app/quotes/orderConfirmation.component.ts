import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {Modal, Overlay, overlayConfigFactory} from "angular2-modal";
import {SearchModal} from "../quote-requests/search.component";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";

@Component({
  moduleId: module.id,
  selector: 'order-confirmation',
  templateUrl: 'orderConfirmation.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class OrderConfirmationComponent implements OnInit, OnDestroy {
  quoteRequest: QuoteRequest;
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(SearchModal,  overlayConfigFactory({ quoteRequest: this.quoteRequest, quote: this.quote }, BSModalContext));
  }

  remove(product: QuoteProduct) {
    this.quote.quote_products.splice(this.quote.quote_products.indexOf(product), 1);
  }


  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(quoteRequestAndQuote => {
        // console.log(`QRAQ: ${JSON.stringify(quoteRequestAndQuote)}`);
        if (quoteRequestAndQuote[0] != null && quoteRequestAndQuote[1].quote_status === QuoteStatus.Quoted) {
          // console.log('Received event ' + JSON.stringify(quoteRequestAndQuote));
          const quoteRequest = quoteRequestAndQuote[0];
          const quote = quoteRequestAndQuote[1];
          if (quoteRequest !== null && quote !== null) {
            this.quoteRequest = quoteRequest;
            this.quote = quote;
            console.log('Changed selected quote to ' + JSON.stringify(this.quote));
          }
        }
      }
    );
  }

  cancelEditing() {
    this.quote = undefined;
    this.quoteRequest = undefined;
    this.selectedQuoteService.setEditing(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
