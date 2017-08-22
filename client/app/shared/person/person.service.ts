import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {Person} from "./person.model";

@Injectable()
export class PersonService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPeople(): Observable<any> {
    return this.http.get('http://localhost:9000/people').map(res => res.json());
  }

  addPerson(person: Person): Observable<any> {
    return this.http.post('http://localhost:9000/people', person, this.options);
  }

  editPerson(person: Person): Observable<any> {
    return this.http.put(`http://localhost:9000/people/${person.id}`, JSON.stringify(person), this.options);
  }

  deletePerson(person: Person): Observable<any> {
    return this.http.delete(`http://localhost:9000/people/${person.id}`, this.options);
  }
}
