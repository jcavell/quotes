import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ASIProductComponent} from "./asiproduct.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'product', component: ASIProductComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ASIProductRoutingModule { }
