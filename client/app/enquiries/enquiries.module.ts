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
import {ASISearchModalComponent} from "./asisearch.component";
import {GazProductService} from "../shared/gazproduct/gazProduct.service";

@NgModule({
  imports: [
    EnquiriesRoutingModule,
    QuoteDocumentModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [EnquiriesComponent, SelectedEnquiryComponent, ASISearchModalComponent],
  exports: [EnquiriesComponent, SelectedEnquiryComponent],
  providers: [EnquiryService, SelectedEnquiryService, GazProductService],
  entryComponents: [ ASISearchModalComponent ]
})
export class EnquiriesModule { }
