import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {Quote, QuoteStatus} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";

@Component({
  moduleId: module.id,
  selector: 'invoice',
  templateUrl: 'invoice.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class InvoiceComponent implements OnInit, OnDestroy {
  enquiry: Enquiry;
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService) {
  }

  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(enquiryAndQuote => {
        // console.log(`QRAQ: ${JSON.stringify(enquiryAndQuote)}`);
        if (enquiryAndQuote[0] != null && enquiryAndQuote[1].quote_status === QuoteStatus.OrderConfirmed) {
          // console.log('Received event ' + JSON.stringify(enquiryAndQuote));
          const enquiry = enquiryAndQuote[0];
          const quote = enquiryAndQuote[1];
          if (enquiry !== null && quote !== null) {
            this.enquiry = enquiry;
            this.quote = quote;
            console.log('Changed selected quote to ' + JSON.stringify(this.quote));
          }
        }
      }
    );
  }

  cancelEditing() {
    this.quote = undefined;
    this.enquiry = undefined;
    this.selectedQuoteService.setEditing(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
