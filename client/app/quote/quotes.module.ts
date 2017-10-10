import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {QuoteService} from "../shared/quote/quote.service";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {SelectedQuoteComponent} from "./selectedQuote.component";

@NgModule({
  imports: [
    QuotesRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [QuotesComponent, SelectedQuoteComponent],
  exports: [QuotesComponent, SelectedQuoteComponent],
  providers: [QuoteService, SelectedQuoteService]
})
export class QuotesModule { }
