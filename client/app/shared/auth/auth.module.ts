import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {Http, HttpModule, JsonpModule, RequestOptions} from "@angular/http";
import {UnauthorizedComponent} from "./unauthorized.component";
import {Auth} from "./auth.service";
import {AuthConfig, AuthHttp} from "angular2-jwt";
import {appRoutingProviders, routing} from "../../app-routes";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
  }), http, options);
}

@NgModule({
  declarations: [
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    },
    appRoutingProviders,
    Auth
  ]
})
export class AuthModule {
}
