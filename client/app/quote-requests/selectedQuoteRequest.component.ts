import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ProductService} from "../shared/product/product.service";
import {Quote, QuoteProduct} from "../shared/quote/quote.model";

/**
 * This class represents the lazy loaded QuoteRequestComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-quote-request',
  templateUrl: 'selectedQuoteRequest.component.html'
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
    this.subscription = this.selectedQuoteRequestService.selectedQuoteRequest$.subscribe(quoteRequestId => {
        if (quoteRequestId !== 0) {
          this.setSelectedQuoteRequest(quoteRequestId);
          console.log('Changed selected quoteRequest to ' + quoteRequestId);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  setSelectedQuoteRequest(quoteRequestId: number): boolean {
    this.quoteRequestService.getNew()
      .subscribe(
        quoteRequests => {
          this.quoteRequest = quoteRequests.find(q => q.id === quoteRequestId);
          this.productService.getProductAndAlternatives(this.quoteRequest.product_id)
            .subscribe(
              products => {
                const quoteProducts = products.map(product =>
                  new QuoteProduct(1, product.id, product.name, product.sku, product.sage_sku,
                    this.quoteRequest.quantity, true, product.origination_price, product.prices));
                this.quote = new Quote(1, this.quoteRequest.id, 'now', quoteProducts);
                // console.log('Set quote to: ' + JSON.stringify(this.quote));
              },
              error => this.errorMessage = <any>error
            );
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
