import {Component} from "@angular/core";

import {CloseGuard, DialogRef, ModalComponent} from "angular2-modal";
import {BSModalContext} from "angular2-modal/plugins/bootstrap";
import {Address} from "../shared/address/address.model";
import {AddressService} from "../shared/address/address.service";

export class EditAddressModalContext extends BSModalContext {
  public address: Address;
}


@Component({
  selector: 'edit-address-modal',
  templateUrl: 'editAddress.component.html'
})
export class EditAddressModalComponent implements CloseGuard, ModalComponent<EditAddressModalContext> {
  context: EditAddressModalContext;
  address: Address;


  constructor(public dialog: DialogRef<EditAddressModalContext>, public addressService: AddressService) {
    this.context = dialog.context;
    this.address = this.context.address;
    dialog.setCloseGuard(this);
  }



  updateAddress(address: Address) {
    this.addressService.updateAddress(address).subscribe(
      res => {
        console.log("updated: " + JSON.stringify(res));
        this.dismiss();
      },
      error => console.log('ERROR')
    );
  }

  beforeDismiss(): boolean {
    return false;
  }

  beforeClose(): boolean {
    return false;
  }

  close() {
    this.dialog.close();
  }

  dismiss() {
    this.dialog.dismiss();
  }
}
