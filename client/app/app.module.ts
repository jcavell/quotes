import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {AppComponent} from "./app.component";
import {RepComponent} from "./rep/rep.component";
import {DataService} from "./services/data.service";
import {QuoteRequestsModule} from "./quote-requests/quoteRequests.module";
import {ProductModule} from "./product/product.module";


@NgModule({
  declarations: [
    AppComponent,
    RepComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ProductModule,
    QuoteRequestsModule
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
