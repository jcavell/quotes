import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {QuotesRoutingModule} from "./quotes-routing.module";
import {QuotesComponent} from "./quotes.component";

@NgModule({
  imports: [QuotesRoutingModule, SharedModule],
  declarations: [QuotesComponent],
  exports: [QuotesComponent],
  providers: []
})
export class QuotesModule { }
