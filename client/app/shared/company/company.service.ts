import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Company} from "./company.model";
import {Options} from "../common/options";

@Injectable()
export class CompanyService {

  private opts = new Options();

  constructor(private http: Http) { }

  search(terms: Observable<string>, params): Observable<[Company[], number]> {
    console.log('Company search called');
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .filter(term => term.length > 1)
      .switchMap(term => {
        params['searchField'] = 'name';
        params['searchValue'] = term;
        return Observable.zip(this.getCompanies(params, 1), this.getCompanyCount(params));
      });
  }

  getCompanyCount(params): Observable<number> {
    console.log('Getting company count');
    return this.http.get('http://localhost:9000/company-count', this.opts.getOptions(params)).map(res => res.json());
  }

  getCompanies(params, page: number): Observable<Company[]> {
    console.log('Getting company records for page ' + page);
    params['page'] = page;
    return this.http.get('http://localhost:9000/companies', this.opts.getOptions(params)).map(res => res.json());
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post('http://localhost:9000/companies', company, this.opts.getOptions()).map(res => res.json());
  }

  upsertCompany(company: Company): Observable<Company> {
    console.log('Upsert company ' + JSON.stringify(company));
    const action = company.id ?
      this.http.put(`http://localhost:9000/companies/${company.id}`, JSON.stringify(company), this.opts.getOptions()) :
      this.http.post(`http://localhost:9000/companies`, JSON.stringify(company), this.opts.getOptions());

    return action.map(res => res.json());
  }

  deleteCompany(company: Company): Observable<any> {
    return this.http.delete(`http://localhost:9000/companies/${company.id}`, this.opts.getOptions());
  }
}
