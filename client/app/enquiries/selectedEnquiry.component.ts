import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {SelectedEnquiryService} from "../shared/enquiry/selectedEnquiry.service";
import {EnquiryService} from "../shared/enquiry/enquiry.service";
import {ASIQuote} from "../shared/quote/quote.model";
import {isNullOrUndefined} from "util";
import {ASIProductService} from "../shared/asiproduct/ASIProduct.service";
import {ASIProductComponent} from "../asiproduct/asiproduct.component";
import {XsellService} from "../shared/xsell/xsell.service";

/**
 * This class represents the lazy loaded EnquiryComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-enquiry',
  templateUrl: 'selectedEnquiry.component.html',
  styleUrls: ['./enquiries.component.scss']
})

export class SelectedEnquiryComponent implements OnInit, OnDestroy {
  enquiry: Enquiry;
  quote: ASIQuote;
  subscription: Subscription;
  errorMessage: any;

  constructor(private xsellservice: XsellService,
              public selectedEnquiryService: SelectedEnquiryService,
              public enquiryService: EnquiryService,
              public asiProductService: ASIProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(ASIProductComponent, overlayConfigFactory({
      productId: this.enquiry.internalProductId,
      quantity: this.enquiry.quantity,
      quote: this.quote
    }, BSModalContext));
  }

  ngOnInit() {
    this.subscription = this.selectedEnquiryService.selectedEnquiry$.subscribe(enquiry => {
        if (isNullOrUndefined(enquiry)) {
          this.enquiry = undefined;
          this.quote = undefined;
        } else {
          this.setSelectedEnquiry(enquiry);
          // console.log('Changed selected enquiry to ' + enquiry.id);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cancelEditing() {
    this.quote = undefined;
    this.enquiry = undefined;
    this.selectedEnquiryService.setEditing(false);
  }

  // remove(product: ASIQuoteProduct) {
  //   this.quote.quote_products.splice(this.quote.quote_products.indexOf(product), 1);
  // }

  setSelectedEnquiry(enquiry: Enquiry): boolean {
    this.enquiry = enquiry;

    // this.xsellservice.getXsells().subscribe(
    //   data => {
    //     const productIds: number[] = data.map(d => d.productId);
    //     productIds.unshift(enquiry.quote.requestProductId);
    //     const productObservables: Observable<ASIProduct >[] = productIds.map(pid => this.asiProductService.getProduct(pid));
    //
    //     Observable.forkJoin(productObservables).subscribe(
    //       products => {
    //         const quoteProducts = products.map(product =>
    //           new ASIQuoteProduct(product.Id, product.Name, this.enquiry.quote.requestQuantity, product.ImageUrl, product.Prices, enquiry.quote.requestQuantity));
    //         this.quote = new ASIQuote(undefined, this.enquiry.quote.id, new Date(), QuoteStatus.New, quoteProducts);
    //         console.log(`AIP Product: ${JSON.stringify(enquiry.quote.requestProductId)}`);
    //       },
    //       error => this.errorMessage = <any>error
    //     );
    //   },
    //   error => console.log(error)
    // );

    return false;
  }
}
