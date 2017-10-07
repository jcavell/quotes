import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {EnquiriesComponent} from "./enquiries.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'enquiries', component: EnquiriesComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class EnquiriesRoutingModule { }
