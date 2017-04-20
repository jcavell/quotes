import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuoteService} from "../shared/quote/quote.service";
import {QuotesComponent} from "./quotes.component";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {SelectedQuoteComponent} from "./selectedQuote.component";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteDocumentComponent} from "./quoteDocument.component";

@NgModule({
  imports: [QuotesRoutingModule, SharedModule],
  declarations: [QuotesComponent, SelectedQuoteComponent, QuoteDocumentComponent],
  exports: [QuotesComponent, SelectedQuoteComponent, QuoteDocumentComponent],
  providers: [QuoteService, SelectedQuoteService]
})
export class QuotesModule { }
