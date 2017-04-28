import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {QuotesStatusPipe} from "./quotesStatus.pipe";
import {PurchaseOrderComponent} from "./purchaseOrder.component";
import {InvoiceComponent} from "./invoice.component";

@NgModule({
  imports: [QuotesRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [QuotesComponent, PurchaseOrderComponent, InvoiceComponent, QuotesStatusPipe],
  exports: [QuotesComponent, PurchaseOrderComponent, InvoiceComponent],
  providers: [SelectedQuoteService]
})
export class QuotesModule { }
