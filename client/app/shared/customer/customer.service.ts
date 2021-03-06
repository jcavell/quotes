import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import {Customer} from "./customer.model";
import {CustomerRecord} from "./customerRecord.model";

@Injectable()
export class CustomerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  private getOptions(params) {
    return new RequestOptions({ headers: this.headers, params: params });
  }

  search(terms: Observable<string>, searchParams): Observable<[CustomerRecord[], number]> {
    console.log('Search called');
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .filter(term => term.length > 1)
      .switchMap(term => {
        searchParams['searchField'] = 'multi';
        searchParams['searchValue'] = term;
        return Observable.zip(this.getCustomerRecords(searchParams, 1), this.getCustomerCount(searchParams));
      });
  }

  getCustomerRecords(searchParams, page: number): Observable<CustomerRecord[]> {
    console.log('Getting customer records for page ' + page);
    searchParams['page'] = page;
    return this.http.get('http://localhost:9000/customers', this.getOptions(searchParams)).map(res => res.json());
  }

  getCustomerCount(searchParams): Observable<number> {
    console.log('Getting customer count');
    return this.http.get('http://localhost:9000/customer-count', this.getOptions(searchParams)).map(res => res.json());
  }
  addCustomer(customer: Customer): Observable<CustomerRecord> {
    return this.http.post('http://localhost:9000/customers', customer, this.options).map(res => res.json());
  }

  upsertCustomer(customer: Customer): Observable<Customer> {
    console.log('Upsert customer ' + JSON.stringify(customer));
    const action = customer.id ?
      this.http.put(`http://localhost:9000/customers/${customer.id}`, JSON.stringify(customer), this.options) :
      this.http.post(`http://localhost:9000/customers`, JSON.stringify(customer), this.options);

    return action.map(res => res.json());
  }

  deleteCustomer(customer: Customer): Observable<Customer> {
    return this.http.delete(`http://localhost:9000/customers/${customer.id}`, this.options).map(res => res.json());
  }
}
