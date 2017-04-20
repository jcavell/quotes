import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Product} from "./product.model";
// import 'rxjs/add/operator/do';  // for debugging

/**
 * This class provides the Product service with methods to read names and add names.
 */
@Injectable()
export class ProductService {

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
    return this.http.get(url)
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  getFromPenWarehouse(): Observable<Product[]> {
    return this.get('mock-data/products/pen-warehouse/all-products.json');
  }

  getFromCrossSell(): Observable<Product[]> {
    return this.get('mock-data/products/cross-sell/all-products.json');
  }


  getStockLevel(sageSku: string): Observable<object> {
    return this.http.get(`mock-data/stock-level/pen-warehouse/${sageSku}.json`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getProductAndAlternatives(requestedProductId: number): Observable<Product[]> {
    let combined = this.getFromPenWarehouse().combineLatest(this.getFromCrossSell(),
      (penWarehouseProds, crossSellProds) => {
        // console.log('cross sell products: ' + JSON.stringify(crossSellProds));
        let quoteProducts: Product[] = [];
        let requestedProd = penWarehouseProds.find(product => product.id === requestedProductId);
        // console.log('requested product: ' + JSON.stringify(requestedProd));
        quoteProducts.push(requestedProd);

        let similarProds = penWarehouseProds.filter(product => product.id !== requestedProductId && product.category === requestedProd.category);
        // console.log('similar products: ' + JSON.stringify(similarProds));

        if (similarProds.length > 0) {
          // console.log('Getting cheapest product')
          let cheapestProd = similarProds.reduce((a, b) => Math.max(a.prices[0], b.prices[[0]])); // TODO use price for quantity requested
          // console.log('cheapest product: ' + JSON.stringify(cheapestProd));
          if (cheapestProd.id !== requestedProd.id) quoteProducts.push(cheapestProd);
          // console.log(`set selected product to ${requestedProd.id} and cheapest product to ${cheapestProd.id}`);
        }
        quoteProducts = quoteProducts.concat(crossSellProds);
        // console.log('***combined products***: ' + JSON.stringify(quoteProducts));
        return quoteProducts;
      });

    return combined;
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

