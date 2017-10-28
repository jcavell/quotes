import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {QuoteService} from "../shared/quote/quote.service";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {SelectedQuoteComponent} from "./selectedQuote.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {EditQuoteComponent} from "./editQuoteComponent";
import {CustomerModule} from "../customer/customer.module";

@NgModule({
  imports: [
    QuotesRoutingModule,
    SharedModule,
    CustomerModule,
    BootstrapModalModule,
    NgbModule
  ],
  declarations: [QuotesComponent, SelectedQuoteComponent, EditQuoteComponent],
  exports: [QuotesComponent, SelectedQuoteComponent],
  providers: [QuoteService, SelectedQuoteService]
})
export class QuotesModule { }
