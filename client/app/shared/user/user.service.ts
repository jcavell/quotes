import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {User} from "./user.model";

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:9000/users').map(res => res.json());
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://localhost:9000/users', user, this.options);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`http://localhost:9000/users/${user.id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`http://localhost:9000/users/${user.id}`, this.options);
  }
}
