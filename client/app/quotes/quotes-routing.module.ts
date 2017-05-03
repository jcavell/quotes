import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuotesComponent} from "./quotes.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quotes', component: QuotesComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class QuotesRoutingModule { }

