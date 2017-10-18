import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";
import {CompanyComponent} from "./company.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'company', component: CompanyComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})

export class CompanyRoutingModule { }
