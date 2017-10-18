import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {XsellService} from "./shared/xsell/xsell.service";
import {ASIProductModule} from "./asiproduct/asiproduct.module";
import {QuoteDocumentModule} from "./quote-document/quoteDocument.module";
import {AuthModule} from "./shared/auth/auth.module";
import {routing} from "./app-routes";
import {XsellComponent} from "./xsell/xsell.component";
import {UserComponent} from "./user/user.component";
import {UserService} from "./shared/user/user.service";
import {EnquiriesModule} from "./enquiries/enquiries.module";
import {QuotesModule} from "./quote/quotes.module";
import {EditAddressModule} from "./address/editAddress.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CompanyModule} from "./company/company.module";
import {CustomerModule} from "./customer/customer.module";

@NgModule({
  declarations: [
    AppComponent,
    XsellComponent,
    UserComponent
  ],
  imports: [
    routing,
    SharedModule,
    ASIProductModule,
    EditAddressModule,
    EnquiriesModule,
    QuotesModule,
    QuoteDocumentModule,
    CompanyModule,
    CustomerModule,
    AuthModule,
    NgbModule.forRoot(),
  ],
  providers: [
    XsellService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
