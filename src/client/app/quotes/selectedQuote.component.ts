import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Rx";
import {Quote} from "../shared/quote/quote.model";
import {SelectedQuoteService} from "../shared/quote/selectedQuote.service";
import {QuoteService} from "../shared/quote/quote.service";
import {ProductService} from "../shared/product/product.service";
import {Product} from "../shared/product/product.model";

/**
 * This class represents the lazy loaded QuoteComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'selected-quote',
  templateUrl: 'selectedQuote.component.html',
  styleUrls: ['quotes.component.css'],
})

export class SelectedQuoteComponent implements OnInit, OnDestroy {
  quote: Quote;
  products: Product[];
  subscription: Subscription;
  errorMessage: any;
  colours: string[] = ['', 'Blue', 'Black', 'Green', 'Red'];

  constructor(public selectedQuoteService: SelectedQuoteService, public quoteService: QuoteService, public productService:ProductService) {}

  ngOnInit() {
    this.subscription = this.selectedQuoteService.selectedQuote$.subscribe(quoteId => {
      if(quoteId !== 0) {
        this.setSelectedQuote(quoteId);
        console.log('Changed selected quote to ' + quoteId);
      }
    }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  retrieveProductsForQuote(requestedProductId: number): boolean {
    this.products=[];
    this.productService.getProductCheapestAlternativeAndCrossSell(requestedProductId)
      .subscribe(
        products => {
         this.products=products;
          console.log(`set this.products in selectedQuote.component`);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }

  setSelectedQuote(quoteId: number): boolean {
    this.quoteService.getNew()
      .subscribe(
        quotes => {
          this.quote = quotes.find(q => q.id === quoteId);
          this.retrieveProductsForQuote(this.quote.product_id);
        },
        error => this.errorMessage = <any>error
      );
    return false;
  }
}
