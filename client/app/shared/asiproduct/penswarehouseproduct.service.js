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
/**
 * This class provides the Product service with methods to read names and add names.
 */
var ProductService = (function () {
    /**
     * Creates a new ProductService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
     */
    function ProductService(http) {
        this.http = http;
    }
    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {Product[]} The Observable for the HTTP request.
     */
    ProductService.prototype.get = function () {
        return this.http.get('mock-data/products/penscouk/all-products.json')
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getStockLevel = function (sageSku) {
        return this.http.get("mock-data/stock-level/penscouk/" + sageSku + ".json")
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    /**
      * Handle HTTP error
      */
    ProductService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
