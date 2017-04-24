import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RepComponent} from "./rep/rep.component";

const routes: Routes = [
  { path: '', component: RepComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
