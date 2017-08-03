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
  productId = 550517407;
  quantity = 500;
  category = '';
  color = '';
  price = 0;
  production_time = 4;
  costMin: 0.2;
  costMax: 2;

  product: ASIProduct;
  searchResults: ASISearchResults;
  errorMessage: string;


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

  public getTotalCost(): number {
    return this.getUnitPrice().Cost * this.quantity;
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

  search(page: number): boolean {
    const filters = new SearchFilters(this.category, '', '91240,30224,31516,34194,36730,38228,39250,39552,66010,40480,42424,42920,43650,45815,47700,52710,52840,55151,55450,55675,55990,56070,38300,57956,43442,61125,61966,62124,65944,66224,66887,67866,71920,81500,74400,79530,87296,89320,68507,92121,93986', this.quantity, this.color, `[${this.costMin} to ${this.costMax}]`, this.production_time, page, 'PRLH', 'supplier,category,price,color');
    this.asiProductService.searchProductsUsingFilters(filters)
      .subscribe(
        searchResults => {
          this.searchResults = searchResults;
          console.log(`AIP Products: ${JSON.stringify(this.searchResults.Dimensions)}`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  cats(): string[] {
    return this.searchResults.Dimensions.Categories.map(c => c.Name);
  }

  prices(): string[] {
    return this.searchResults.Dimensions.Prices.map(c => c.Name);
  }

  colors(): string[] {
    const colors = !this.searchResults ? [] : this.searchResults.Dimensions.Colors.map(c => c.Name);
    colors.unshift(this.color);
    return colors;
  }

}

