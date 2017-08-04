import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";
import {SearchModalComponent} from "./search.component";

import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ASIQuote, ASIQuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {isNullOrUndefined} from "util";
import {ASIProductService} from "../shared/product/ASIProduct.service";

/**
 * This class represents the lazy loaded QuoteRequestComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-quote-request',
  templateUrl: 'selectedQuoteRequest.component.html',
  styleUrls: ['./quoteRequests.component.scss']
})

export class SelectedQuoteRequestComponent implements OnInit, OnDestroy {
  quoteRequest: QuoteRequest;
  quote: ASIQuote;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteRequestService: SelectedQuoteRequestService,
              public quoteRequestService: QuoteRequestService,
              public asiProductService: ASIProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(SearchModalComponent,  overlayConfigFactory({ quoteRequest: this.quoteRequest, quote: this.quote }, BSModalContext));
  }

  ngOnInit() {
    this.subscription = this.selectedQuoteRequestService.selectedQuoteRequest$.subscribe(quoteRequest => {
        if (isNullOrUndefined(quoteRequest)) {
          this.quoteRequest = undefined;
          this.quote = undefined;
        } else {
          this.setSelectedQuoteRequest(quoteRequest);
          // console.log('Changed selected quoteRequest to ' + quoteRequest.id);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancelEditing() {
    this.quote = undefined;
    this.quoteRequest = undefined;
    this.selectedQuoteRequestService.setEditing(false);
  }

  remove(product: ASIQuoteProduct) {
    this.quote.quote_products.splice(this.quote.quote_products.indexOf(product), 1);
  }

  setSelectedQuoteRequest(quoteRequest: QuoteRequest): boolean {
    this.quoteRequest = quoteRequest;

      this.asiProductService.getProduct(quoteRequest.product_id)
        .subscribe(
          product => {
            const quoteProduct = new ASIQuoteProduct(product.Id, product.Name, this.quoteRequest.quantity, product.ImageUrl, product.Prices, quoteRequest.quantity);
            this.quote = new ASIQuote(undefined, this.quoteRequest.id, new Date(), QuoteStatus.New, [quoteProduct]);
            console.log(`AIP Product: ${JSON.stringify(quoteRequest.product_id)}`);
          },
          error => this.errorMessage = <any>error
        );
      return false;
    }


  //   this.productService.getMultiple(this.quoteRequest.sku)
  //     .subscribe(
  //       products => {
  //         const quoteProducts = products.map(product =>
  //           new QuoteProduct(product.id, product.name, product.sku, product.sage_sku,
  //             this.quoteRequest.quantity, product.origination_price, product.prices, 0, 0, product.image_url));
  //         this.quote = new Quote(undefined, this.quoteRequest.id, new Date(), QuoteStatus.New, quoteProducts);
  //         // console.log('Set quote to: ' + JSON.stringify(this.quote));
  //       },
  //       error => {
  //         this.errorMessage = <any>error;
  //         console.log(`ERROR ${JSON.stringify(error)}`);
  //       }
  //     );
  //   return false;
  // }
}
