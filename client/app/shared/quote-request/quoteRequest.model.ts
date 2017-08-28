export class QuoteRequest {
  constructor(public id: number,
              public product_id: number,
              public customer_name: string,
              public customer_telephone: string,
              public customer_email: string,
              public company: string,
              public date_required: string,
              public quantity: number,
              public other_requirements: string) {

  }
}


export class NQuote {
  constructor(public id: number,
              public status: string,
              public requestTimestamp: string,
              public requestDateRequired: string,
              public requestProductId: number,
              public requestCustomerName: string,
              public requestCustomerEmail: string,
              public requestCustomerTel: string,
              public requestCompany: string,
              public requestQuantity: number,
              public requestOtherRequirements: string) {
  }
}

export class NQuoteWithProducts {
  constructor(public quote: NQuote) {
    // TODO add product at time of quote
  }
}

export class NQuotes {
  constructor(public quotes: NQuoteWithProducts[]) {
  }
}


