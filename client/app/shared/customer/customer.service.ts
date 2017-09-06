import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Customer} from "./customer.model";

@Injectable()
export class CustomerService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCustomers(): Observable<any> {
    return this.http.get('http://localhost:9000/customers').map(res => res.json());
  }

  addCustomer(customer: Customer): Observable<any> {
    console.log("Adding customer "+ JSON.stringify(customer));
    return this.http.post('http://localhost:9000/customers', customer, this.options);
  }

  editCustomer(customer: Customer): Observable<any> {
    return this.http.put(`http://localhost:9000/customers/${customer.id}`, JSON.stringify(customer), this.options);
  }

  deleteCustomer(customer: Customer): Observable<any> {
    return this.http.delete(`http://localhost:9000/customers/${customer.id}`, this.options);
  }
}
