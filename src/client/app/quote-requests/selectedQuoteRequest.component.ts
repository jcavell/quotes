import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ProductService} from "../shared/product/product.service";
import {Product} from "../shared/product/product.model";

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
  products: Product[];
  subscription: Subscription;
  errorMessage: any;
  colours: string[] = ['', 'Blue', 'Black', 'Green', 'Red'];

  constructor(public selectedQuoteRequestService: SelectedQuoteRequestService, public quoteRequestService: QuoteRequestService, public productService:ProductService) {}

  ngOnInit() {
    this.subscription = this.selectedQuoteRequestService.selectedQuoteRequest$.subscribe(quoteRequestId => {
      if(quoteRequestId !== 0) {
        this.setSelectedQuoteRequest(quoteRequestId);
        console.log('Changed selected quoteRequest to ' + quoteRequestId);
      }
    }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  retrieveProductsForQuoteRequest(requestedProductId: number): boolean {
    this.products=[];
    this.productService.getProductCheapestAlternativeAndCrossSell(requestedProductId)
      .subscribe(
        products => {
         this.products=products;
          console.log(`set this.products in selectedQuoteRequest.component`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  setSelectedQuoteRequest(quoteRequestId: number): boolean {
    this.quoteRequestService.getNew()
      .subscribe(
        quoteRequests => {
          this.quoteRequest = quoteRequests.find(q => q.id === quoteRequestId);
          this.retrieveProductsForQuoteRequest(this.quoteRequest.product_id);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
