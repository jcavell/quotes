import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {OldQuotesComponent} from "./oldquotes.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quotes', component: OldQuotesComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class OldQuotesRoutingModule { }

