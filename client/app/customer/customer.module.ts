import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CustomerRoutingModule} from "./customer-routing.module";
import {CustomerService} from "../shared/customer/customer.service";
import {CustomerComponent} from "./customer.component";
import {EditCustomerComponent} from "./editCustomerComponent";

@NgModule({
  imports: [
    SharedModule,
    BootstrapModalModule,
    CustomerRoutingModule,
    NgbModule
  ],
  declarations: [CustomerComponent, EditCustomerComponent],
  exports: [CustomerComponent, EditCustomerComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
