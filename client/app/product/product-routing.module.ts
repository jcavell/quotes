import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ProductComponent} from "./product.component";
import {AuthGuard} from "../shared/auth/auth.guard";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'product', component: ProductComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
