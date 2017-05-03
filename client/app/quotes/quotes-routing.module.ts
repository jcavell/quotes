import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuotesComponent} from "./quotes.component";
import {AuthGuard} from "../shared/auth/auth.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quotes', component: QuotesComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class QuotesRoutingModule { }

