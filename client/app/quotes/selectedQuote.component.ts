import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";

/**
 * This class represents the lazy loaded QuoteRequestComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-quote',
  templateUrl: 'selectedQuote.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class SelectedQuoteComponent implements OnInit, OnDestroy {
  quoteRequest: QuoteRequest;
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService) {
  }

  ngOnInit() {
    // this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(qid => {
    //   console.log('Received event ' + JSON.stringify(qid));
    // });

    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(quoteRequestAndQuote => {
      // console.log('Received event ' + JSON.stringify(quoteRequestAndQuote));
        const quoteRequest = quoteRequestAndQuote[0];
        const quote = quoteRequestAndQuote[1];
        if (quoteRequest !== null && quote !== null) {
          this.quoteRequest = quoteRequest;
          this.quote = quote;
          console.log('Changed selected quote to ' + JSON.stringify(this.quote));
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
