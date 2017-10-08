"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
// import 'rxjs/add/operator/do';  // for debugging
var ProductFilters = (function () {
    function ProductFilters() {
    }
    return ProductFilters;
}());
exports.ProductFilters = ProductFilters;
/**
 * This class provides the Product service with methods to read names and add names.
 */
var PensWarehouseProductService = (function () {
    /**
     * Creates a new ProductService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function PensWarehouseProductService(http) {
        this.http = http;
    }
    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {PensWarehouseProduct[]} The Observable for the HTTP request.
     */
    PensWarehouseProductService.prototype.get = function (url, filters) {
        return this.http.get(url, { params: filters })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PensWarehouseProductService.prototype.getFromPenWarehouse = function () {
        return this.get('http://localhost:3001/products', new ProductFilters());
    };
    PensWarehouseProductService.prototype.getFromPenWarehouseMongo = function (filters) {
        return this.get('http://localhost:3000/api/penwarehouseproducts', filters);
    };
    PensWarehouseProductService.prototype.getSingleFromPenWarehouseMongo = function (sku) {
        return this.http.get("http://localhost:3000/api/penwarehouseproducts/" + sku)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PensWarehouseProductService.prototype.getFromCrossSell = function () {
        return this.get('http://localhost:3001/cross-sell', new ProductFilters());
    };
    PensWarehouseProductService.prototype.getStock = function (sageSku) {
        return this.http.get("http://localhost:3001/stock-level-by-sage-sku/" + sageSku)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PensWarehouseProductService.prototype.getMultiple = function (sku) {
        var combined = this.getAlternatives(sku).combineLatest(this.getSingleFromPenWarehouseMongo(sku), function (alternatives, requestedProduct) {
            // console.log(`requested product: ${JSON.stringify(requestedProduct)}`);
            alternatives.unshift(requestedProduct);
            return alternatives;
        });
        return combined;
    };
    PensWarehouseProductService.prototype.getAlternatives = function (sku) {
        var combined = this.getFromPenWarehouseMongo(new ProductFilters()).combineLatest(this.getFromCrossSell(), function (penWarehouseProds, crossSellProds) {
            // console.log('cross sell products: ' + JSON.stringify(crossSellProds));
            var quoteProducts = [];
            var similarProds = penWarehouseProds.filter(function (product) { return product.sku !== sku; });
            if (similarProds.length > 0) {
                // console.log('Getting cheapest product')
                // TODO use price for quantity requested
                var cheapestProd = similarProds.sort(function (a, b) { return a.prices[0] - b.prices[0]; })[0];
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
    };
    /**
     * Handle HTTP error
     */
    PensWarehouseProductService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return PensWarehouseProductService;
}());
PensWarehouseProductService = __decorate([
    core_1.Injectable()
], PensWarehouseProductService);
exports.PensWarehouseProductService = PensWarehouseProductService;
