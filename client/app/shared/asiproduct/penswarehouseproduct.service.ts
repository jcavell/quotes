import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {PensWarehouseProduct, PensWarehouseStock} from "./penswarehouseproduct.model";
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
export class PensWarehouseProductService {

  /**
   * Creates a new ProductService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {PensWarehouseProduct[]} The Observable for the HTTP request.
   */
  private get(url: string, filters: ProductFilters): Observable<PensWarehouseProduct[]> {
    return this.http.get(url, {params: filters})
      .map((res: Response) => res.json())
      //              .do(data => console.log('server data:', data))  // debug
      .catch(this.handleError);
  }

  getFromPenWarehouse(): Observable<PensWarehouseProduct[]> {
    return this.get('http://localhost:3001/products', new ProductFilters());
  }

  getFromPenWarehouseMongo(filters: ProductFilters): Observable<PensWarehouseProduct[]> {
    return this.get('http://localhost:3000/api/penwarehouseproducts', filters);
  }

  getSingleFromPenWarehouseMongo(sku: string): Observable<PensWarehouseProduct> {
    return this.http.get(`http://localhost:3000/api/penwarehouseproducts/${sku}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getFromCrossSell(): Observable<PensWarehouseProduct[]> {
    return this.get('http://localhost:3001/cross-sell', new ProductFilters());
  }


  getStock(sageSku: string): Observable<PensWarehouseStock> {
    return this.http.get(`http://localhost:3001/stock-level-by-sage-sku/${sageSku}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  getMultiple(sku: string): Observable<PensWarehouseProduct[]> {
    const combined = this.getAlternatives(sku).combineLatest(this.getSingleFromPenWarehouseMongo(sku),
      (alternatives, requestedProduct) => {
        // console.log(`requested product: ${JSON.stringify(requestedProduct)}`);
        alternatives.unshift(requestedProduct);
        return alternatives;
      });
    return combined;
  }

  getAlternatives(sku: string): Observable<PensWarehouseProduct[]> {
    const combined = this.getFromPenWarehouseMongo(new ProductFilters()).combineLatest(this.getFromCrossSell(),
      (penWarehouseProds, crossSellProds) => {
        // console.log('cross sell products: ' + JSON.stringify(crossSellProds));
        let quoteProducts: PensWarehouseProduct[] = [];

        const similarProds: PensWarehouseProduct[] = penWarehouseProds.filter(product => product.sku !== sku);

        if (similarProds.length > 0) {
          // console.log('Getting cheapest product')

          // TODO use price for quantity requested
          const cheapestProd = similarProds.sort((a, b) => a.prices[0] - b.prices[0])[0];

          // console.log('cheapest product: ' + JSON.stringify(cheapestProd));
          if (cheapestProd.sku !== sku) {
            quoteProducts.push(cheapestProd);
          }
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
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

