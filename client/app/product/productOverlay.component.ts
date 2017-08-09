import {Component} from "@angular/core";

import {CloseGuard, DialogRef, ModalComponent} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {ASIProductService} from "../shared/product/ASIProduct.service";
import {ASIProduct} from "../shared/product/ASIProduct.model";
import {ASIQuote, ASIQuoteProduct} from "../shared/quote/quote.model";

export class ProductModalContext extends BSModalContext {
  public productId: number;
  public quantity: number;
  public quote: ASIQuote;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'search-modal',
  templateUrl: 'productOverlay.component.html'
})
export class ProductModalComponent implements CloseGuard, ModalComponent<ProductModalContext> {
  context: ProductModalContext;
  product: ASIProduct;
  errorMessage: string;

  constructor(public dialog: DialogRef<ProductModalContext>, public asiProductService: ASIProductService) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
    this.getProduct();
  }

  getProduct(): boolean {
    this.asiProductService.getProduct(this.context.productId)
      .subscribe(
        product => {
          this.product = product;
          console.log(`AIP Product: ${JSON.stringify(this.product)}`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  close() {
    this.dialog.close();
  }

  dismiss() {
    this.dialog.dismiss();
  }

  add(product: ASIProduct) {
    // console.log(`Adding product ${JSON.stringify(product)} with prices ${product.Prices}`);
    const quoteProduct = new ASIQuoteProduct(product.Id, product.Name, this.context.quantity, product.ImageUrl, product.Prices, 0);
    this.context.quote.quote_products.unshift(quoteProduct);
  }
}
