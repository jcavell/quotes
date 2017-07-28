import {Component, ViewContainerRef} from "@angular/core";
import {ProductService} from "../shared/product/product.service";
import {ASIProductService, SearchFilters} from "../shared/product/ASIProduct.service";
import {ASIPrice, ASIProduct} from "../shared/product/ASIProduct.model";
import {ASISearchResults} from "../shared/product/ASISearchResults.model";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {Modal, Overlay, overlayConfigFactory} from "angular2-modal";
import {ProductModalComponent} from "./productOverlay.component";

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


  constructor(public productService: ProductService, public asiProductService: ASIProductService, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  openProductModal(productId: number) {
    return this.modal.open(ProductModalComponent,  overlayConfigFactory({ productId : productId }, BSModalContext));
  }

  public getTotalPages(): number {
    return Math.ceil(this.searchResults.ResultsTotal / this.searchResults.ResultsPerPage);
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

  searchWithQs(qs: string): boolean {
    this.asiProductService.searchProductsUsingQs(qs)
      .subscribe(
        searchResults => {
          this.searchResults = searchResults;
          console.log(`AIP Producta: ${JSON.stringify(this.searchResults)}`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  search(): boolean {
    const filters = new SearchFilters(this.category, '', '', this.quantity, 'PRLH', 'supplier,category');
    this.asiProductService.searchProductsUsingFilters(filters)
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

