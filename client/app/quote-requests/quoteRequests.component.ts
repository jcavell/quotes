import {Component, OnDestroy, OnInit} from "@angular/core";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {NQuoteWithProducts} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {Subscription} from "rxjs";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'quoteRequests.component.html',
  styleUrls: ['./quoteRequests.component.scss']
})

export class QuoteRequestsComponent implements OnInit, OnDestroy {
  quoteRequests: NQuoteWithProducts[];
  selectedQuoteRequest: NQuoteWithProducts;
  errorMessage: string;
  isEditing = false;
  subscription: Subscription;

  constructor(public quoteRequestService: QuoteRequestService, public selectedQuoteRequestService: SelectedQuoteRequestService) {
  }

  ngOnInit() {
    this.subscription = this.selectedQuoteRequestService.isEditing$.subscribe(isEditing => {
      this.isEditing = isEditing;
      console.log('ngOnInit: Changed isEditing to ' + this.isEditing);
    });

    this.selectedQuoteRequestService.selectedQuoteRequest$.subscribe(quoteRequest => {
      console.log(`ngOnInit: Setting selected quote request to ${JSON.stringify(quoteRequest)}`);
      this.selectedQuoteRequest = quoteRequest;
    });

    this.getQuoteRequests();
  }

  ngOnDestroy() {
    // console.log('Destroying quoteRequestsComponent');
    this.selectedQuoteRequestService.setEditing(false);
    this.subscription.unsubscribe();
    this.selectedQuoteRequest = undefined;
    this.selectedQuoteRequestService.changeQuoteRequest(undefined);
  }

  /*
   Quote button clicked - inform listeners and set edit mode
   */
  displaySelectedQuoteRequest(event: Event, quoteRequest: NQuoteWithProducts) {
    console.log('Changing selected quoteRequest');
    this.selectedQuoteRequestService.changeQuoteRequest(quoteRequest);
    this.selectedQuoteRequestService.setEditing(true);
  }

  /*
   Called from ngOnInit, get all new quote requests
   */
  getQuoteRequests(): boolean {
    this.quoteRequestService.getNew()
      .subscribe(
        nquotes => {
          this.quoteRequests = nquotes.quotes;
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
