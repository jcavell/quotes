import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ProductService} from "../shared/product/product.service";
import {Quote, QuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {isNullOrUndefined} from "util";

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
  quote: Quote;
  subscription: Subscription;
  errorMessage: any;
  colours: string[] = ['', 'Blue', 'Black', 'Green', 'Red'];

  constructor(public selectedQuoteRequestService: SelectedQuoteRequestService,
              public quoteRequestService: QuoteRequestService,
              public productService: ProductService) {
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

  setSelectedQuoteRequest(quoteRequest: QuoteRequest): boolean {
    this.quoteRequest = quoteRequest;
    this.productService.getProductAndAlternatives(this.quoteRequest.product_id)
      .subscribe(
        products => {
          const quoteProducts = products.map(product =>
            new QuoteProduct(product.id, product.name, product.sku, product.sage_sku,
              this.quoteRequest.quantity, true, product.origination_price, product.prices, 0, 0));
          this.quote = new Quote(undefined, this.quoteRequest.id, new Date(), QuoteStatus.New, quoteProducts);
          // console.log('Set quote to: ' + JSON.stringify(this.quote));
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
