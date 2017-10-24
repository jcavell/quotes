import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import {Customer} from "./customer.model";
import {CustomerRecord} from "./customerRecord.model";
import _ from "lodash";

@Injectable()
export class CustomerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  private getOptions(params) {
    return new RequestOptions({ headers: this.headers, params: params });
  }

  search(terms: Observable<string>, params): Observable<CustomerRecord[]> {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => {
        params['searchField'] = 'multi';
        params['searchValue'] = term;
        return _.isEmpty(term) ? Observable.of([]) : this.getCustomerRecords(params);
      });
  }

  getCustomerRecords(params): Observable<CustomerRecord[]> {
    return this.http.get('http://localhost:9000/customers', this.getOptions(params)).map(res => res.json());
  }

  addCustomer(customer: Customer): Observable<CustomerRecord> {
    return this.http.post('http://localhost:9000/customers', customer, this.options).map(res => res.json());
  }

  upsertCustomer(customer: Customer): Observable<Customer> {
    const action = customer.id ?
      this.http.put(`http://localhost:9000/customers/${customer.id}`, JSON.stringify(customer), this.options) :
      this.http.post(`http://localhost:9000/customers`, JSON.stringify(customer), this.options);

    return action.map(res => res.json());
  }

  deleteCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete(`http://localhost:9000/customers/${customer.id}`, this.options).map(res => res.json());
  }
}
