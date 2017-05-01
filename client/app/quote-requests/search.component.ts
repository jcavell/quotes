import {Component} from "@angular/core";

import {CloseGuard, DialogRef, ModalComponent} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {Product} from "../shared/product/product.model";
import {ProductService} from "../shared/product/product.service";
import {QuoteRequest} from "../shared/quote-request/quoteRequest.model";
import {Quote, QuoteProduct} from "../shared/quote/quote.model";

export class SearchModalContext extends BSModalContext {
  public quoteRequest: QuoteRequest;
  public quote: Quote;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
  selector: 'search-modal',
  templateUrl: 'search.component.html'
})
export class SearchModal implements CloseGuard, ModalComponent<SearchModalContext> {
  context: SearchModalContext;

  products: Product[];
  errorMessage: string;
  quantity = 500;
  numColours = '';
  inkColour = '';
  colour = '';
  leadTime = 0;
  priceKey = 'tbc';
  leadTimes: string[] = ['1-4 working days', '5-10 working days', '11-20 working days']
  inkColours: string[] = ['', 'Blue', 'Black', 'Green', 'Red'];
  colours: string[] = ['', 'Blue', 'Black', 'Green', 'Red'];

  constructor(public dialog: DialogRef<SearchModalContext>, public productService: ProductService) {
    this.context = dialog.context;
    dialog.setCloseGuard(this);
  }

  doFilter(product: Product) {
    let passesFilter: boolean = this.quantity >= product.minimum_order_quantity;
    if (passesFilter && this.numColours !== '') {
      passesFilter = product.branding_method === this.numColours + 'COL';
    }
    if (passesFilter && this.inkColour !== '') {
      passesFilter = product.ink_colour === this.inkColour;
    }
    if (passesFilter && this.colour !== '') {
      passesFilter = product.colour === this.colour;
    }
    if (passesFilter && this.leadTime !== 0) {
      passesFilter = product.max_lead_time <= this.leadTime;
    }
    return passesFilter;
  }


  setPriceKey() {
    if (this.quantity <= 999) {
      this.priceKey = '500';
    } else if (this.quantity <= 1999) {
      this.priceKey = '1000';
    } else if (this.quantity <= 4999) {
      this.priceKey = '2000';
    } else if (this.quantity <= 9999) {
      this.priceKey = '5000';
    } else {
      this.priceKey = '10000';
    }
  }

  setStockLevel(product: Product) {
    this.productService.getStock(product.sage_sku)
      .subscribe(
        stock => {
          product.stock_level = stock.stock_level;
          if (product.stock_level < this.quantity) {
            product.enough_stock = false;
          } else {
            product.enough_stock = true;
          }
        },
        error => this.errorMessage = <any>error
      );
  }

  getProducts(): boolean {
    this.productService.getFromPenWarehouse()
      .subscribe(
        products => {
          this.products = products.filter(p => this.doFilter(p));
          this.products.forEach(product => this.setStockLevel(product));
          this.setPriceKey();
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

  add(product: Product) {
    const quoteProduct = new QuoteProduct(product.id, product.name, product.sku, product.sage_sku,
      this.quantity, product.origination_price, product.prices, 0, 0);
    this.context.quote.quote_products.push(quoteProduct);
  }
}
