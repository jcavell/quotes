import {NgModule} from "@angular/core";
import {ASIProductComponent} from "./asiproduct.component";
import {ASIProductRoutingModule} from "./asiproduct-routing.module";
import {SharedModule} from "../shared/shared.module";
import {PensWarehouseProductService} from "../shared/asiproduct/penswarehouseproduct.service";
import {ASIProductService} from "../shared/asiproduct/ASIProduct.service";
import {ASIProductModalComponent} from "./asiproductOverlay.component";
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [ASIProductRoutingModule, SharedModule, BrowserAnimationsModule, BusyModule],
  declarations: [ASIProductComponent, ASIProductModalComponent],
  exports: [ASIProductComponent],
  providers: [PensWarehouseProductService, ASIProductService],
  entryComponents: [ ASIProductModalComponent ]
})
export class ASIProductModule { }
