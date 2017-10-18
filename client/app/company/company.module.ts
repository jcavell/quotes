import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CompanyComponent} from "./company.component";
import {EditCompanyComponent} from "./editCompanyComponent";
import {CompanyService} from "../shared/company/company.service";
import {CompanyRoutingModule} from "./company-routing.module";

@NgModule({
  imports: [
    SharedModule,
    BootstrapModalModule,
    CompanyRoutingModule,
    NgbModule
  ],
  declarations: [CompanyComponent],
  exports: [CompanyComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
