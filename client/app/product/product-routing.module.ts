import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProductComponent} from "./product.component";
import {AuthForRepGuard} from "../shared/auth/authForRep.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'product', component: ProductComponent, canActivate: [AuthForRepGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
