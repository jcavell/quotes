import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {SelectedASIQuoteService} from "../shared/asiquote/selectedASIQuote.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {QuotesStatusPipe} from "./quotesStatus.pipe";
import {OrderAcknowledgementComponent} from "./orderAcknowledgement.component";
import {InvoiceComponent} from "./invoice.component";

@NgModule({
  imports: [QuotesRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [QuotesComponent, OrderAcknowledgementComponent, InvoiceComponent, QuotesStatusPipe],
  exports: [QuotesComponent, OrderAcknowledgementComponent, InvoiceComponent],
  providers: [SelectedASIQuoteService]
})
export class QuotesModule { }
