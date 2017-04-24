import {Component, OnInit} from "@angular/core";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";

/**
 * This class represents the lazy loaded QuoteRequestsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'quoteRequests.component.html',
  styleUrls: ['quoteRequests.component.css'],
})

export class QuoteRequestsComponent implements OnInit {
  quoteRequests: QuoteRequest[];
  errorMessage: string;

  constructor(public quoteRequestService: QuoteRequestService, public selectedQuoteRequestService: SelectedQuoteRequestService) {}

  ngOnInit() {
    this.getQuoteRequests();
  }

  displaySelectedQuoteRequest(event: Event, quoteRequest:QuoteRequest) {
    console.log('Selected quote: ' + quoteRequest.id);
    this.selectedQuoteRequestService.changeQuote(quoteRequest);
  }


  getQuoteRequests(): boolean {
    this.quoteRequestService.getNew()
      .subscribe(
        quotes => {
          this.quoteRequests = quotes;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
