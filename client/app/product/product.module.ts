import {NgModule} from "@angular/core";
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SharedModule} from "../shared/shared.module";
import {ProductService} from "../shared/product/product.service";
import {ASIProductService} from "../shared/product/ASIProduct.service";
import {ProductModalComponent} from "./productOverlay.component";
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [ProductRoutingModule, SharedModule, BrowserAnimationsModule, BusyModule],
  declarations: [ProductComponent, ProductModalComponent],
  exports: [ProductComponent],
  providers: [ProductService, ASIProductService],
  entryComponents: [ ProductModalComponent ]
})
export class ProductModule { }
