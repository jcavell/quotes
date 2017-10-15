import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {ModalModule} from "angular2-modal";
import {BootstrapModalModule} from "angular2-modal/plugins/bootstrap";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";
import {QuoteService} from "../shared/quote/quote.service";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {SelectedQuoteComponent} from "./selectedQuote.component";
import {EditQuoteModalComponent} from "./editQuote.component";
import {NgDatepickerModule} from "ng2-datepicker";

@NgModule({
  imports: [
    QuotesRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    NgDatepickerModule
  ],
  declarations: [QuotesComponent, SelectedQuoteComponent, EditQuoteModalComponent],
  exports: [QuotesComponent, SelectedQuoteComponent],
  providers: [QuoteService, SelectedQuoteService, EditQuoteModalComponent],
  entryComponents: [EditQuoteModalComponent]
})
export class QuotesModule { }
