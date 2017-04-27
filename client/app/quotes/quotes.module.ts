import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {SelectedQuoteComponent} from "./selectedQuote.component";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {QuotesStatusPipe} from "./quotesStatus.pipe";

@NgModule({
  imports: [QuotesRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [QuotesComponent, SelectedQuoteComponent, QuotesStatusPipe],
  exports: [QuotesComponent, SelectedQuoteComponent],
  providers: [SelectedQuoteService]
})
export class QuotesModule { }
