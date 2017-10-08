import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {XsellService} from "./shared/xsell/xsell.service";
import {ASIProductModule} from "./asiproduct/asiproduct.module";
import {QuotesModule} from "./quotes/quotes.module";
import {QuoteDocumentModule} from "./quote-document/quoteDocument.module";
import {AuthModule} from "./shared/auth/auth.module";
import {routing} from "./app-routes";
import {XsellComponent} from "./xsell/xsell.component";
import {CompanyComponent} from "./company/company.component";
import {CompanyService} from "./shared/company/company.service";
import {CustomerComponent} from "./customer/customer.component";
import {CustomerService} from "./shared/customer/customer.service";
import {UserComponent} from "./user/user.component";
import {UserService} from "./shared/user/user.service";
import {EnquiriesModule} from "./enquiries/enquiries.module";

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CustomerComponent,
    XsellComponent,
    UserComponent
  ],
  imports: [
    routing,
    SharedModule,
    ASIProductModule,
    EnquiriesModule,
    QuotesModule,
    QuoteDocumentModule,
    AuthModule
  ],
  providers: [
    CompanyService,
    CustomerService,
    XsellService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
