import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {QuoteRecord} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteService} from "../shared/quote/quote.service";
import {isNullOrUndefined} from "util";
import {ASIProductComponent} from "../asiproduct/asiproduct.component";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";

/**
 * This class represents the lazy loaded QuoteComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-quote',
  templateUrl: 'selectedQuote.component.html',
  styleUrls: ['./quotes.component.scss']
})

export class SelectedQuoteComponent implements OnInit, OnDestroy {
  quoteRecord: QuoteRecord;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService,
              public quoteService: QuoteService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(ASIProductComponent, overlayConfigFactory({
    }, BSModalContext));
  }

  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(quoteRecord => {
        if (isNullOrUndefined(quoteRecord)) {
          this.quoteRecord = undefined;
        } else {
          this.setSelectedQuote(quoteRecord);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getThumb(product: GazProduct) {
    return 'https://www.everythingbranded.co.uk/asset/image/imagep/thumbnail/' + product.images[0].imageid + '.jpg';
  }

  cancelEditing() {
    this.quoteRecord = undefined;
    this.selectedQuoteService.setEditing(false);
  }


  setSelectedQuote(qr: QuoteRecord): boolean {
    this.quoteRecord = qr;

    // this.xsellservice.getXsells().subscribe(
    //   data => {
    //     const productIds: number[] = data.map(d => d.productId);
    //     productIds.unshift(quote.quote.requestProductId);
    //     const productObservables: Observable<ASIProduct >[] = productIds.map(pid => this.asiProductService.getProduct(pid));
    //
    //     Observable.forkJoin(productObservables).subscribe(
    //       products => {
    //         const quoteProducts = products.map(product =>
    //           new ASIQuoteProduct(product.Id, product.Name, this.quote.quote.requestQuantity, product.ImageUrl, product.Prices, quote.quote.requestQuantity));
    //         this.quote = new ASIQuote(undefined, this.quote.quote.id, new Date(), QuoteStatus.New, quoteProducts);
    //         console.log(`AIP Product: ${JSON.stringify(quote.quote.requestProductId)}`);
    //       },
    //       error => this.errorMessage = <any>error
    //     );
    //   },
    //   error => console.log(error)
    // );

    return false;
  }
}
