import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {QuoteItem, QuoteRecord} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteService} from "../shared/quote/quote.service";
import {isNullOrUndefined} from "util";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";
import {Address} from "../shared/address/address.model";
import {EditAddressModalComponent} from "../address/editAddress.component";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {IAlert} from "../shared/customer/customer.alert";
import {CustomerRecord} from "../shared/customer/customerRecord.model";

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
  quoteItems: QuoteItem[];
  subscription: Subscription;
  alert: IAlert;

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
    return this.gazProductService.getThumb(product);
  }

  cancelEditing() {
    this.quoteRecord = undefined;
    this.selectedQuoteService.setEditing(false);
  }

  deleteQuoteItem(quoteItem: QuoteItem) {
      this.quoteService.deleteQuoteItem(quoteItem.id).subscribe(
        success => {
          this.quoteItems = this.quoteItems.filter(i => i !== quoteItem);
          this.alert = {
            type: 'success',
            message: 'Quote item deleted'
          };
        },
        error => {
          this.alert = {
            type: 'danger',
            message: 'Quote item could not be deleted: ' + JSON.stringify(error)
          };
        }
      );
  }

  setSelectedQuote(qr: QuoteRecord): boolean {
    this.quoteRecord = qr;

    this.quoteService.getLineItems(qr.quote.id).subscribe(
      quoteItems => {
        this.quoteItems = quoteItems;
        this.quoteItems.forEach(quoteItem => {
            if (!quoteItem.product) {
              this.gazProductService.getProduct(quoteItem.productId).subscribe(
                product => {
                  quoteItem.product = product;
                },
                error => console.log(error)
              );
            }
          },
        );

        return false;
      });
    return false;
  }

  quoteItemCreated(event: [QuoteItem, GazProduct]) {
    const quoteItem = event[0];
    const product = event[1];
    this.quoteItems.push(quoteItem);
  }

  quoteItemUpdated(event: [QuoteItem, GazProduct]) {
    const quoteItem = event[0];
    const product = event[1];
    const lineItemIndex = this.getQuoteItemIndex(quoteItem);

    this.quoteItems[lineItemIndex] = quoteItem;
  }

  private getQuoteItemIndex(lineItem: QuoteItem) {
    const lineItemndex = this.quoteItems.findIndex(qi => qi.id === lineItem.id);
    return lineItemndex;
  }

  customerUpserted(cr: CustomerRecord) {
    this.quoteRecord.quote.customerId = cr.customer.id;
    this.quoteService.updateQuote(this.quoteRecord.quote).subscribe(
      success => {},
      error => {}
    );
  }

  alertCreated(alert: IAlert) {
    this.alert = alert;
  }

  public closeAlert() {
    this.alert = undefined;
  }
}
