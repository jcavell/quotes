import {Component, OnInit} from "@angular/core";
import {QuoteService} from "../shared/quote/quote.service";
import {Quote} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";

/**
 * This class represents the lazy loaded QuotesComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'quotes.component.html',
  styleUrls: ['quotes.component.css'],
})

export class QuotesComponent implements OnInit {
  quotes: Quote[];
  errorMessage: string;

  constructor(public quoteService: QuoteService, public selectedQuoteService: SelectedQuoteService) {}

  ngOnInit() {
    this.getQuotes();
  }

  displaySelectedQuote(event: Event, quote:Quote) {
    console.log('Selected quote: ' + quote.id);
    this.selectedQuoteService.changeQuote(quote);
  }



  getQuotes(): boolean {
    this.quoteService.getNew()
      .subscribe(
        quotes => {
          this.quotes = quotes;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
