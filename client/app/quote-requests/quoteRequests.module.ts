import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuoteRequestService} from "../shared/quote-request/quoteRequest.service";
import {QuoteRequestsComponent} from "./quoteRequests.component";
import {QuoteRequestsRoutingModule} from "./quoteRequests-routing.module";
import {SelectedQuoteRequestComponent} from "./selectedQuoteRequest.component";
import {SelectedQuoteRequestService} from "../shared/quote-request/selectedQuoteRequest.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {SearchModalComponent} from "./search.component";

@NgModule({
  imports: [
    QuoteRequestsRoutingModule,
    QuoteDocumentModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [QuoteRequestsComponent, SelectedQuoteRequestComponent, SearchModalComponent],
  exports: [QuoteRequestsComponent, SelectedQuoteRequestComponent],
  providers: [QuoteRequestService, SelectedQuoteRequestService],
  entryComponents: [ SearchModalComponent ]
})
export class QuoteRequestsModule { }
