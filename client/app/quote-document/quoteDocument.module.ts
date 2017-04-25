import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuoteDocumentComponent} from "../quote-document/quoteDocument.component";

@NgModule({
  imports: [SharedModule],
  declarations: [QuoteDocumentComponent],
  exports: [QuoteDocumentComponent],
  providers: []
})
export class QuoteDocumentModule { }
