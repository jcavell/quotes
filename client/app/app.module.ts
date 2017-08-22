import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {XsellService} from "./shared/xsell/xsell.service";
import {QuoteRequestsModule} from "./quote-requests/quoteRequests.module";
import {ProductModule} from "./product/product.module";
import {QuotesModule} from "./quotes/quotes.module";
import {QuoteDocumentModule} from "./quote-document/quoteDocument.module";
import {AuthModule} from "./shared/auth/auth.module";
import {routing} from "./app-routes";
import {XsellComponent} from "./xsell/xsell.component";
import {CompanyComponent} from "./company/company.component";
import {CompanyService} from "./shared/company/company.service";
import {PersonComponent} from "./person/person.component";
import {PersonService} from "./shared/person/person.service";

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    PersonComponent,
    XsellComponent
  ],
  imports: [
    routing,
    SharedModule,
    ProductModule,
    QuoteRequestsModule,
    QuotesModule,
    QuoteDocumentModule,
    AuthModule
  ],
  providers: [
    CompanyService,
    PersonService,
    XsellService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
