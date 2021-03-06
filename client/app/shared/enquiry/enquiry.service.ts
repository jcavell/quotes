import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Enquiry} from "./enquiry.model";
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Product service with methods to read names and add names.
 */
@Injectable()
export class EnquiryService {

  /**
   * Creates a new Enquirieservice with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {PensWarehouseProduct[]} The Observable for the HTTP request.
   */
getNew(queryParams): Observable<Enquiry[]> {
    return this.http.get('http://localhost:9000/enquiries', {'params' : queryParams})
                    .map((res: Response) => res.json())
    //              .do(data => console.log('server data:', data))  // debug
                    .catch(this.handleError);
  }


  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

