import {Component, OnDestroy, OnInit, ViewContainerRef} from "@angular/core";
import {Overlay, overlayConfigFactory} from "angular2-modal";
import {BSModalContext, Modal} from "angular2-modal/plugins/bootstrap";

import {Subscription} from "rxjs/Rx";
import {Enquiry} from "../shared/enquiry/enquiry.model";
import {SelectedEnquiryService} from "../shared/enquiry/selectedEnquiry.service";
import {isNullOrUndefined} from "util";
import {ASIProductComponent} from "../asiproduct/asiproduct.component";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";
import {GazProduct} from "../shared/gazproduct/gazproduct.model";

@Component({
  moduleId: module.id,
  selector: 'selected-enquiry',
  templateUrl: 'selectedEnquiry.component.html',
  styleUrls: ['./enquiries.component.scss']
})

export class SelectedEnquiryComponent implements OnInit, OnDestroy {
  enquiry: Enquiry;
  products: GazProduct[];
  xsellProducts: Map<number, GazProduct>;
  subscription: Subscription;
  errorMessage: any;

  constructor(public selectedEnquiryService: SelectedEnquiryService,
              public gazProductService: GazProductService,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openSearchModal() {
    return this.modal.open(ASIProductComponent, overlayConfigFactory({
      productId: this.enquiry.internalProductId,
      quantity: this.enquiry.quantity,
    }, BSModalContext));
  }

  ngOnInit() {
    this.subscription = this.selectedEnquiryService.selectedEnquiry$.subscribe(enquiry => {
        if (isNullOrUndefined(enquiry)) {
          this.enquiry = undefined;
        } else {
          this.setSelectedEnquiry(enquiry);
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
    return false;
  }
}
