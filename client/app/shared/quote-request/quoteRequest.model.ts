export class QuoteRequest {
  constructor(public id: number,
              public rep_id: number,
              public lead_source: string,
              public lead_subject: string,
              public customer_name: string,
              public customer_telephone: string,
              public customer_email: string,
              public customer_company: string,
              public date_added: string,
              public product_id: number,
              public quantity: number,
              public supplier: string,
              public sku: string) {

  }
}