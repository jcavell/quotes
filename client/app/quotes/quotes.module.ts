import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {QuotesStatusPipe} from "./quotesStatus.pipe";
import {OrderConfirmationComponent} from "./orderConfirmation.component";
import {InvoiceComponent} from "./invoice.component";

@NgModule({
  imports: [QuotesRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [QuotesComponent, OrderConfirmationComponent, InvoiceComponent, QuotesStatusPipe],
  exports: [QuotesComponent, OrderConfirmationComponent, InvoiceComponent],
  providers: [SelectedQuoteService]
})
export class QuotesModule { }
