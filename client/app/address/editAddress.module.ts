import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {EditAddressModalComponent} from "./editAddress.component";
import {AddressService} from "../shared/address/address.service";

@NgModule({
  imports: [SharedModule],
  declarations: [EditAddressModalComponent],
  exports: [EditAddressModalComponent],
  providers: [AddressService],
  entryComponents: [ EditAddressModalComponent ]
})
export class EditAddressModule { }
