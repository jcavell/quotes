import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {RepComponent} from "./rep/rep.component";
import {DataService} from "./services/data.service";
import {QuoteRequestsModule} from "./quote-requests/quoteRequests.module";
import {ProductModule} from "./product/product.module";
import {QuotesModule} from "./quotes/quotes.module";
import {QuoteDocumentModule} from "./quote-document/quoteDocument.module";
import {AuthModule} from "./shared/auth/auth.module";
import {routing} from "./app-routes";

@NgModule({
  declarations: [
    AppComponent,
    RepComponent
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
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
