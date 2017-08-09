import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Observable, Subscription} from "rxjs/Rx";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {ASIQuote, ASIQuoteProduct, QuoteStatus} from "../shared/quote/quote.model";
import {isNullOrUndefined} from "util";
import {ASIProductService} from "../shared/product/ASIProduct.service";
import {ASIProduct} from "../shared/product/ASIProduct.model";
import {ProductComponent} from "../product/product.component";
import {DataService} from "../services/data.service";

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

  constructor(private dataService: DataService,
              public selectedQuoteRequestService: SelectedQuoteRequestService,
              public quoteRequestService: QuoteRequestService,
              public asiProductService: ASIProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(ProductComponent, overlayConfigFactory({
      productId: this.quoteRequest.product_id,
      quantity: this.quoteRequest.quantity,
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

  setSelectedQuoteRequest(quoteRequest: QuoteRequest): boolean {

    this.quoteRequest = quoteRequest;

    this.dataService.getXsells().subscribe(
      data => {
        const productIds: number[] = data.map(d => d.productId);
        productIds.unshift(quoteRequest.product_id);
        const productObservables: Observable<ASIProduct >[] = productIds.map(pid => this.asiProductService.getProduct(pid));

        Observable.forkJoin(productObservables).subscribe(
          products => {
            const quoteProducts = products.map(product =>
              new ASIQuoteProduct(product.Id, product.Name, this.quoteRequest.quantity, product.ImageUrl, product.Prices, quoteRequest.quantity));
            this.quote = new ASIQuote(undefined, this.quoteRequest.id, new Date(), QuoteStatus.New, quoteProducts);
            console.log(`AIP Product: ${JSON.stringify(quoteRequest.product_id)}`);
          },
          error => this.errorMessage = <any>error
        );
      },
      error => console.log(error)
    );

    return false;
  }
}
