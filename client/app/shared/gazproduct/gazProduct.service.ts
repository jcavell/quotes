import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {GazProduct} from "./gazproduct.model";
// import 'rxjs/add/operator/do';  // for debugging


export class GazSearchFilters {
  constructor(public q: string,
                 public category: string,
                 public supplier: string,
                 public asi: string,
                 public quantity: number,
                 public color: string,
                 public cost: string,
                 public production_time: number,
                 public page: number,
                 public sort: string,
                 public dl: string) {
}

  public getParams() {
    let q = this.q;
    if (this.asi) {
      q += ` asi:${this.asi}`;
    }
    if (this.cost) {
      q += ` cost: ${this.cost}`;
    }
    if (this.color) {
      q += ` color: ${this.color}`;
    }
    if (this.category) {
      q += ` category:${this.category}`;
    }
    if (this.supplier) {
      q += ` supplier:${this.supplier}`;
    }
    if (this.quantity) {
      q += ` quantity: ${this.quantity}`;
    }
    if (this.production_time) {
      q += ` production_time: ${this.production_time}`;
    }

    const params = {'q': q};

    if (this.page) {
      params['page'] = this.page;
    }

    if (this.dl) {
      params['dl'] = this.dl;
    }

    if (this.sort) {
      params['sort'] = this.sort;
    }
    console.log("PARAMS: " + JSON.stringify(params));
    return params;
  };
}


/**
 * This class provides the Product service with methods to read names and add names.
 */
@Injectable()
export class GazProductService {

  /**
   * Creates a new ProductService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }


  getProduct(internalProductId: number): Observable<GazProduct> {
    return this.http.get(`http://localhost:9000/gazproduct/${internalProductId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

