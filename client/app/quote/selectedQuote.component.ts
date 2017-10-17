import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {QuoteLineItem, QuoteRecord} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteService} from "../shared/quote/quote.service";
import {isNullOrUndefined} from "util";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";
import {Address} from "../shared/address/address.model";
import {EditAddressModalComponent} from "../address/editAddress.component";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";

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
  quoteLineItems: QuoteLineItem[];
  lineItemProducts: Map<number, GazProduct>;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedQuoteService: SelectedQuoteService,
              public quoteService: QuoteService,
              public gazProductService: GazProductService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openEditAddressModal(address: Address) {
    return this.modal.open(EditAddressModalComponent, overlayConfigFactory({
      address: address
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

    this.quoteService.getLineItems(qr.quote.id).subscribe(
      lineItems => {
        this.quoteLineItems = lineItems;
        this.lineItemProducts = new Map<number, GazProduct>();
        this.quoteLineItems.forEach(lineItem => {
            this.gazProductService.getProduct(lineItem.productId).subscribe(
              product => {
                this.lineItemProducts.set(lineItem.productId, product);
                console.log('SET: ' + product);
              });
          },
          error => console.log(error)
        );

        return false;
      });
    return false;
  }
}
