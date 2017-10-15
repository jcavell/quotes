import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {PensWarehouseProductService} from "./asiproduct/penswarehouseproduct.service";
import {ASIQuoteService} from "./asiquote/ASIQuote.service";

import {ToastComponent} from "./toast/toast.component";
import {BusyModule} from "angular2-busy";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // Shared Components
    ToastComponent
  ],
  declarations: [ToastComponent],
  providers: [ToastComponent, PensWarehouseProductService, ASIQuoteService],
})
export class SharedModule {
}
