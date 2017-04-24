import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteRequestsComponent} from "./quoteRequests.component";
import {QuoteRequestsRoutingModule} from "./quoteRequests-routing.module";
import {SelectedQuoteRequestComponent} from "./selectedQuoteRequest.component";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteDocumentComponent} from "../quote/quoteDocument.component";

@NgModule({
  imports: [QuoteRequestsRoutingModule, SharedModule],
  declarations: [QuoteRequestsComponent, SelectedQuoteRequestComponent, QuoteDocumentComponent],
  exports: [QuoteRequestsComponent, SelectedQuoteRequestComponent, QuoteDocumentComponent],
  providers: [QuoteRequestService, SelectedQuoteRequestService]
})
export class QuoteRequestsModule { }
