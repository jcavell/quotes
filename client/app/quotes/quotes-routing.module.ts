import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {QuotesComponent} from "./quotes.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'quotes', component: QuotesComponent }
    ])
  ],
  exports: [RouterModule]
})

export class QuotesRoutingModule { }

