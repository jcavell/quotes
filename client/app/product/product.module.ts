import {NgModule} from "@angular/core";
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ProductService} from "../shared/product/product.service";
import {ASIProductService} from "../shared/product/ASIProduct.service";

@NgModule({
  imports: [ProductRoutingModule, SharedModule],
  declarations: [ProductComponent],
  exports: [ProductComponent],
  providers: [ProductService, ASIProductService]
})
export class ProductModule { }
