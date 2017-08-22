import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Company} from "./company.model";

@Injectable()
export class CompanyService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getCompanies(): Observable<any> {
    return this.http.get('http://localhost:9000/companies').map(res => res.json());
  }

  addCompany(company: Company): Observable<any> {
    return this.http.post('http://localhost:9000/companies', company, this.options);
  }

  editCompany(company: Company): Observable<any> {
    return this.http.put(`http://localhost:9000/companies/${company.id}`, JSON.stringify(company), this.options);
  }

  deleteCompany(company: Company): Observable<any> {
    return this.http.delete(`http://localhost:9000/companies/${company.id}`, this.options);
  }
}
