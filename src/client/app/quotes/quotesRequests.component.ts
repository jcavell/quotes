import {Component, OnInit} from "@angular/core";
import {QuoteService} from "../shared/quote/quote.service";
import {QuoteRequest} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";

/**
 * This class represents the lazy loaded QuotesComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'quoteRequests.component.html',
  styleUrls: ['quoteRequests.component.css'],
})

export class QuotesComponent implements OnInit {
  quoteRequests: QuoteRequest[];
  errorMessage: string;

  constructor(public quoteService: QuoteService, public selectedQuoteService: SelectedQuoteService) {}

  ngOnInit() {
    this.getQuoteRequests();
  }

  displaySelectedQuote(event: Event, quote:QuoteRequest) {
    console.log('Selected quote: ' + quote.id);
    this.selectedQuoteService.changeQuote(quote);
  }



  getQuoteRequests(): boolean {
    this.quoteService.getNew()
      .subscribe(
        quotes => {
          this.quoteRequests = quotes;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
