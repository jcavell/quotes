import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteStatus} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";

@Component({
  moduleId: module.id,
  selector: 'invoice',
  templateUrl: 'invoice.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class InvoiceComponent implements OnInit, OnDestroy {
  quoteRequest: QuoteRequest;
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService) {
  }

  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(quoteRequestAndQuote => {
        // console.log(`QRAQ: ${JSON.stringify(quoteRequestAndQuote)}`);
        if (quoteRequestAndQuote[0] != null && quoteRequestAndQuote[1].quote_status === QuoteStatus.OrderConfirmed) {
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
