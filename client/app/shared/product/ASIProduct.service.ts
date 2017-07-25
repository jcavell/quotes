import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Product} from "./product.model";
import {ASIProduct} from "./ASIProduct.model";
import {ASISearchResults} from "./ASISearchResults.model";
// import 'rxjs/add/operator/do';  // for debugging


export class ProductFilters {
  colour: string;
  ink_colour: string;
  order_quantity: number;
  branding_method: string;
}


/**
 * This class provides the Product service with methods to read names and add names.
 */
@Injectable()
export class ASIProductService {

  private headers = new Headers(
    {
      'Authorization' : 'AsiMemberAuth client_id=500057384&client_secret=fde3381a96af18c43d4ce2d73667585c'
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
  private get(url: string, filters: ProductFilters): Observable<Product[]> {
    return this.http.get(url, {
      headers: this.headers,
      params: filters}
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

  searchProducts(): Observable<ASISearchResults> {
    return this.http.get(`https://api.asicentral.com/v1/products/search.json?q=pens&supplier:ALightPromos&dl=supplier,category`, {headers: this.headers})
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

