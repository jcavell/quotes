import {Component, OnInit} from "@angular/core";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {Subscription} from "rxjs";

/**
 * This class represents the lazy loaded QuoteRequestsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'quoteRequests.component.html',
  styleUrls: ['./quoteRequests.component.scss']
})

export class QuoteRequestsComponent implements OnInit {
  quoteRequests: QuoteRequest[];
  selectedQuoteRequest: QuoteRequest;
  errorMessage: string;
  isEditing = false;
  subscription: Subscription;

  constructor(public quoteRequestService: QuoteRequestService, public selectedQuoteRequestService: SelectedQuoteRequestService) {}

  ngOnInit() {
    this.subscription = this.selectedQuoteRequestService.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
      console.log('Changed isEditing to ' + this.isEditing);
    });

    this.getQuoteRequests();
  }

  displaySelectedQuoteRequest(event: Event, quoteRequest: QuoteRequest) {
    // console.log('Selected quote: ' + quoteRequest.id);
    this.selectedQuoteRequestService.changeQuote(quoteRequest);
    this.selectedQuoteRequest = quoteRequest;
    this.selectedQuoteRequestService.setEditing(true);
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
