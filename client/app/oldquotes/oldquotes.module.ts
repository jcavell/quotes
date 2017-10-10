import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {OldQuotesRoutingModule} from "./oldquotes-routing.module";
import {OldQuotesComponent} from "./oldquotes.component";
import {SelectedASIQuoteService} from "../shared/asiquote/selectedASIQuote.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {OldQuotesStatusPipe} from "./oldquotesStatus.pipe";
import {OldOrderAcknowledgementComponent} from "./oldorderAcknowledgement.component";
import {OldInvoiceComponent} from "./oldinvoice.component";

@NgModule({
  imports: [OldQuotesRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [OldQuotesComponent, OldOrderAcknowledgementComponent, OldInvoiceComponent, OldQuotesStatusPipe],
  exports: [OldQuotesComponent, OldOrderAcknowledgementComponent, OldInvoiceComponent],
  providers: [SelectedASIQuoteService]
})
export class OldQuotesModule { }
