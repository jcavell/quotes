import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {SelectedEnquiryService} from "../shared/enquiry/selectedEnquiry.service";
import {EnquiryService} from "../shared/enquiry/enquiry.service";
import {ASIQuote} from "../shared/asiquote/ASIQuote.model";
import {isNullOrUndefined} from "util";
import {ASIProductComponent} from "../asiproduct/asiproduct.component";
import {XsellService} from "../shared/xsell/xsell.service";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";

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
  products: GazProduct[];
  xsellProducts: Map<number, GazProduct>;
  subscription: Subscription;
  errorMessage: any;

  constructor(private xsellservice: XsellService,
              public selectedEnquiryService: SelectedEnquiryService,
              public enquiryService: EnquiryService,
              public gazProductService: GazProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
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

  getThumb(product: GazProduct) {
    return 'https://www.everythingbranded.co.uk/asset/image/imagep/thumbnail/' + product.images[0].imageid + '.jpg';
  }

  cancelEditing() {
    this.quote = undefined;
    this.enquiry = undefined;
    this.selectedEnquiryService.setEditing(false);
  }


  removeProduct(product: GazProduct) {
    this.products.splice(this.products.indexOf(product), 1);
  }

  addProductAndRemoveXsell(product: GazProduct) {
    this.products.push(product);
    this.xsellProducts.delete(product.productid);
  }

  setSelectedEnquiry(enquiry: Enquiry): boolean {
    this.enquiry = enquiry;

   this.gazProductService.getProduct(enquiry.internalProductId).subscribe(
      product => {
        this.products = [product];
      }
    );

   this.xsellProducts = new Map<number, GazProduct>();
   this.enquiry.xsellProductIds.forEach( xsellProductId => {
     this.gazProductService.getProduct(xsellProductId).subscribe(
       product => {
         this.xsellProducts.set(xsellProductId, product);
       });
     }
   );



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
