import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Product} from "./product.model";
import {ASIProduct} from "./ASIProduct.model";
import {ASISearchResults} from "./ASISearchResults.model";
// import 'rxjs/add/operator/do';  // for debugging


export class SearchFilters {
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
export class ASIProductService {

  private headers = new Headers(
    {
      'Authorization': 'AsiMemberAuth client_id=500057384&client_secret=fde3381a96af18c43d4ce2d73667585c'
    }
  );

  /**
   * Creates a new ProductService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {Product[]} The Observable for the HTTP request.
   */
  private get(url: string): Observable<Product[]> {
    return this.http.get(url, {
        headers: this.headers
      }
    )
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }


  getProduct(Id: number): Observable<ASIProduct> {
    return this.http.get(`https://api.asicentral.com/v1/products/${Id}.json`, {headers: this.headers})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  searchProductsUsingQs(qs: string): Observable<ASISearchResults> {
    return this.http.get(`https://api.asicentral.com/v1/products/search.json${qs}`,
      {
        headers: this.headers
      })
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  searchProductsUsingFilters(filters: SearchFilters): Observable<ASISearchResults> {
    return this.http.get(`https://api.asicentral.com/v1/products/search.json`,
      {
        headers: this.headers,
        params: filters.getParams()
      })
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

