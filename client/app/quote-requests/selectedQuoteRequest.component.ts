import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Observable, Subscription} from "rxjs/Rx";
import {NQuoteWithProducts} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ASIQuote, ASIQuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {isNullOrUndefined} from "util";
import {ASIProductService} from "../shared/product/ASIProduct.service";
import {ASIProduct} from "../shared/product/ASIProduct.model";
import {ProductComponent} from "../product/product.component";
import {XsellService} from "../shared/xsell/xsell.service";

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
  quoteRequest: NQuoteWithProducts;
  quote: ASIQuote;
  subscription: Subscription;
  errorMessage: any;

  constructor(private xsellservice: XsellService,
              public selectedQuoteRequestService: SelectedQuoteRequestService,
              public quoteRequestService: QuoteRequestService,
              public asiProductService: ASIProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(ProductComponent, overlayConfigFactory({
      productId: this.quoteRequest.quote.requestProductId,
      quantity: this.quoteRequest.quote.requestQuantity,
      quote: this.quote
    }, BSModalContext));
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

  setSelectedQuoteRequest(quoteRequest: NQuoteWithProducts): boolean {

    this.quoteRequest = quoteRequest;

    this.xsellservice.getXsells().subscribe(
      data => {
        const productIds: number[] = data.map(d => d.productId);
        productIds.unshift(quoteRequest.quote.requestProductId);
        const productObservables: Observable<ASIProduct >[] = productIds.map(pid => this.asiProductService.getProduct(pid));

        Observable.forkJoin(productObservables).subscribe(
          products => {
            const quoteProducts = products.map(product =>
              new ASIQuoteProduct(product.Id, product.Name, this.quoteRequest.quote.requestQuantity, product.ImageUrl, product.Prices, quoteRequest.quote.requestQuantity));
            this.quote = new ASIQuote(undefined, this.quoteRequest.quote.id, new Date(), QuoteStatus.New, quoteProducts);
            console.log(`AIP Product: ${JSON.stringify(quoteRequest.quote.requestProductId)}`);
          },
          error => this.errorMessage = <any>error
        );
      },
      error => console.log(error)
    );

    return false;
  }
}
