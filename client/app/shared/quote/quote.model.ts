import {ASIPrice} from "../asiproduct/ASIProduct.model";
export enum QuoteStatus {
  New = 0,
  Quoted = 1,
  OrderConfirmed = 2,
  Invoiced = 3
}


export class ASIQuoteProduct {
  constructor(public product_id: number,
              public name: string,
              public quantity: number,
              public image_url: string,
              public prices: [ASIPrice],
              public markup: number) {

  }

  public getPreMarkupPrice(): ASIPrice {
    return this.prices.reduce((a, b) =>
      a.Quantity.From <= this.quantity && a.Quantity.To >= this.quantity ? a : b);
  }

  public getMarkedUpUnitCost(): number {
    return this.getPreMarkupPrice().Cost * (1 + this.markup / 100);
  }

  public getMarkedUpTotalCost(): number {
    return this.getMarkedUpUnitCost() * this.quantity;
  }


}

export class ASIQuote {
  constructor(public _id: String,
              public quote_request_id: number,
              public quote_created: Date,
              public quote_status: QuoteStatus,
              public quote_products: ASIQuoteProduct[]) {

  }
}


export class QuoteProduct {
  constructor(public product_id: number,
              public name: string,
              public sku: string,
              public sage_sku: string,
              public quantity: number,
              public origination_price: number,
              public prices: Map<number, number>,
              public unit_price: number,
              public markup: number,
              public image_url: string) {

  }
}

export class Quote {
  constructor(public _id: String,
              public quote_request_id: number,
              public quote_created: Date,
              public quote_status: QuoteStatus,
              public quote_products: QuoteProduct[]) {

  }
}
