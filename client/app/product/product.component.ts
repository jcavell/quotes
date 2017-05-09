import {Component} from "@angular/core";
import {ProductFilters, ProductService} from "../shared/product/product.service";
import {Product} from "../shared/product/product.model";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'product.component.html'
})
export class ProductComponent {
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

  constructor(public productService: ProductService) {
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
    const filters = new ProductFilters();
    if (this.colour) {
      filters.colour = this.colour;
    }
    if (this.inkColour) {
      filters.ink_colour = this.inkColour;
    }
    if (this.numColours) {
      filters.branding_method = this.numColours + 'COL';
    }
    if (this.quantity) {
      filters.order_quantity = this.quantity;
    }

    this.productService.getFromPenWarehouseMongo(filters)
      .subscribe(
        products => {
          this.products = products;
          console.log(`Number of products: ${products.length}`);
          // this.products.forEach(product => this.setStockLevel(product));
          this.products.forEach(product => {product.stock_level = 100; product.enough_stock = true; });
          this.setPriceKey();
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}

