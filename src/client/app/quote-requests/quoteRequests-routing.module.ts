import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuoteRequestsComponent} from "./quoteRequests.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quote-requests', component: QuoteRequestsComponent }
    ])
  ],
  exports: [RouterModule]
})

export class QuoteRequestsRoutingModule { }
