import {Component} from "@angular/core";
import {ProductService} from "../shared/product/product.service";
import {ASIProductService, SearchFilters} from "../shared/product/ASIProduct.service";
import {ASIPrice, ASIProduct} from "../shared/product/ASIProduct.model";
import {ASISearchResults} from "../shared/product/ASISearchResults.model";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'product.component.html'
})
export class ProductComponent {
  product: ASIProduct;
  productId = 550517407;

  category: string;
  searchResults: ASISearchResults;
  errorMessage: string;
  quantity = 500;


  constructor(public productService: ProductService, public asiProductService: ASIProductService) {
  }


  public getUnitPrice(): ASIPrice {
    return this.product.Prices.reduce((a, b) =>
      a.Quantity.From <= this.quantity && a.Quantity.To >= this.quantity ? a : b);
  }

  public getTotalPrice(): number {
    return this.getUnitPrice().Price * this.quantity;
  }

  getProduct(): boolean {
    this.asiProductService.getProduct(this.productId)
      .subscribe(
        product => {
          this.product = product;
          console.log(`AIP Product: ${JSON.stringify(this.product)}`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  search(): boolean {
    const filter = new SearchFilters(this.category, '', '', this.quantity, 'supplier,category');
    this.asiProductService.searchProducts(filter)
      .subscribe(
        searchResults => {
          this.searchResults = searchResults;
          console.log(`AIP Producta: ${JSON.stringify(this.searchResults)}`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

}

