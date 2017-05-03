import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuoteRequestsComponent} from "./quoteRequests.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quote-requests', component: QuoteRequestsComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class QuoteRequestsRoutingModule { }
