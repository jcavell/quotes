import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {EditAddressModalComponent} from "./editAddress.component";
import {AddressService} from "../shared/address/address.service";

@NgModule({
  imports: [SharedModule, BrowserAnimationsModule, BusyModule],
  declarations: [EditAddressModalComponent],
  exports: [EditAddressModalComponent],
  providers: [AddressService],
  entryComponents: [ EditAddressModalComponent ]
})
export class EditAddressModule { }
