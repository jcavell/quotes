export class QuoteProduct {
  constructor(public id: number,
              product_id: number,
              product_name: string,
              product_sku: string,
              product_sage_sku: string,
              quantity: number,
              unitPrice: number) {

  }
}

export class Quote {
  constructor(public id: number,
              quote_request_id: number,
              quote_created: string,
              quote_products: QuoteProduct[]) {

  }
}
