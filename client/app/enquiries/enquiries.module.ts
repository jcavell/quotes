import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {EnquiryService} from "../shared/enquiry/enquiry.service";
import {EnquiriesComponent} from "./enquiries.component";
import {EnquiriesRoutingModule} from "./enquiries-routing.module";
import {SelectedEnquiryComponent} from "./selectedEnquiry.component";
import {SelectedEnquiryService} from "../shared/enquiry/selectedEnquiry.service";
import {QuoteDocumentModule} from "../quote-document/quoteDocument.module";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {SearchModalComponent} from "./search.component";

@NgModule({
  imports: [
    EnquiriesRoutingModule,
    QuoteDocumentModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [EnquiriesComponent, SelectedEnquiryComponent, SearchModalComponent],
  exports: [EnquiriesComponent, SelectedEnquiryComponent],
  providers: [EnquiryService, SelectedEnquiryService],
  entryComponents: [ SearchModalComponent ]
})
export class EnquiriesModule { }
