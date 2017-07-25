import {Component} from "@angular/core";
import {ProductService} from "../shared/product/product.service";
import {ASIProductService} from "../shared/product/ASIProduct.service";
import {ASIProduct} from "../shared/product/ASIProduct.model";
import {ASISearchResults} from "../shared/product/ASISearchResults.model";

@Component({
  moduleId: module.id,
  selector: 'sd-rep',
  templateUrl: 'product.component.html'
})
export class ProductComponent {
  product: ASIProduct;
  productId = 550517407;

  searchResults: ASISearchResults;
  errorMessage: string;
  quantity = 500;


  constructor(public productService: ProductService, public asiProductService: ASIProductService) {
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
    this.asiProductService.searchProducts()
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

