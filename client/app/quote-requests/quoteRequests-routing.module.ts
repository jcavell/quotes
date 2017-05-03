import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuoteRequestsComponent} from "./quoteRequests.component";
import {AuthGuard} from "../shared/auth/auth.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quote-requests', component: QuoteRequestsComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class QuoteRequestsRoutingModule { }
