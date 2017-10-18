import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";
import {CustomerComponent} from "./customer.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class CustomerRoutingModule { }
