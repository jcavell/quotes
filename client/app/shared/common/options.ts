import {Headers, RequestOptions} from "@angular/http";
export class Options {

  private headers = new Headers({'Content-Type': 'application/json', 'charset': 'UTF-8'});
  private options = new RequestOptions({headers: this.headers});

  constructor() {}

  public getOptions(params?) {
    return new RequestOptions({headers: this.headers, params: params});
  }
}
