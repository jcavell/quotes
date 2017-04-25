import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteRequestsComponent} from "./quoteRequests.component";
import {QuoteRequestsRoutingModule} from "./quoteRequests-routing.module";
import {SelectedQuoteRequestComponent} from "./selectedQuoteRequest.component";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";

@NgModule({
  imports: [QuoteRequestsRoutingModule, QuoteDocumentModule, SharedModule],
  declarations: [QuoteRequestsComponent, SelectedQuoteRequestComponent],
  exports: [QuoteRequestsComponent, SelectedQuoteRequestComponent],
  providers: [QuoteRequestService, SelectedQuoteRequestService]
})
export class QuoteRequestsModule { }
