export enum QuoteStatus {
  New = 0,
  Quoted = 1,
  POd = 2,
  Invoiced = 3
}

export class QuoteProduct {
  constructor(public product_id: number,
              public name: string,
              public sku: string,
              public sage_sku: string,
              public quantity: number,
              public is_included: boolean,
              public origination_price: number,
              public prices: Map<number, number>,
              public unit_price: number) {

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
