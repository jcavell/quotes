import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {Quote, QuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {Modal, Overlay, overlayConfigFactory} from "angular2-modal";
import {SearchModalComponent} from "../enquiries/search.component";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";

@Component({
  moduleId: module.id,
  selector: 'order-acknowledgement',
  templateUrl: 'orderAcknowledgement.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class OrderAcknowledgementComponent implements OnInit, OnDestroy {
  enquiry: Enquiry;
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(SearchModalComponent,  overlayConfigFactory({ enquiry: this.enquiry, quote: this.quote }, BSModalContext));
  }

  remove(product: QuoteProduct) {
    this.quote.quote_products.splice(this.quote.quote_products.indexOf(product), 1);
  }


  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(enquiryAndQuote => {
        // console.log(`QRAQ: ${JSON.stringify(enquiryAndQuote)}`);
        if (enquiryAndQuote[0] != null && enquiryAndQuote[1].quote_status === QuoteStatus.Quoted) {
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
