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
