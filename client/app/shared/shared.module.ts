import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ProductService} from "./product/product.service";
import {QuoteService} from "./quote/quote.service";

import {ToastComponent} from "./toast/toast.component";

@NgModule({
   imports: [
       BrowserModule,
       FormsModule,
       ReactiveFormsModule,
       HttpModule
   ],
   exports: [
       // Shared Modules
       BrowserModule,
       FormsModule,
       ReactiveFormsModule,
       HttpModule,
       // Shared Components
       ToastComponent
   ],
   declarations: [ToastComponent],
   providers: [ToastComponent, ProductService, QuoteService],
})
export class SharedModule { }
