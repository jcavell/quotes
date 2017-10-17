export class Enquiry {
  constructor(public id: number,
              public enquiryId:  number,
              public enquiryTimestamp: string,
              public productId:  number,
              public sku: string,
              public productName: string,
              public supplier: string,
              public colour: string,
              public customerName: string,
              public customerTelephone: string,
              public customerEmail: string,
              public company: string,
              public dateRequired: string,
              public quantity:  number,
              public repId:  number,
              public repEmail: String,
              public source: string,
              public subject: string,
              public xsellProductIds: number[],
              public otherRequirements: string,
              public imported: Boolean = false) {

  }
}


export class NQuote {
  constructor(public id: number,
              public status: string,
              public requestTimestamp: string,
              public requestDateRequired: string,
              public requestProductId: number,
              public requestCustomerFirstName: string,
              public requestCustomerLastName: string,
              public requestCustomerEmail: string,
              public requestCustomerDirectPhone: string,
              public requestCompany: string,
              public requestQuantity: number,
              public requestOtherRequirements: string) {
  }
}

export class NCompany {
  constructor(public name: string) {
  }
}

export class NCustomer {
  constructor(
    public firstName: string,
    public lastName: string,
    public salutation: string,
    public email: string,
    public directPhone: string,
    public mobilePhone: string,
    public source: string,
    public position: string,
    public isMainContact: boolean,
    public twitter: string,
    public facebook: string,
    public linkedIn: string,
    public skype: string
  ) {
  }
}

export class NQuoteWithProducts {
  constructor(
    public quote: NQuote,
    public company: NCompany,
    public customer: NCustomer
    // TODO add products etc.
  ) {
  }
}

export class NQuotes {
  constructor(public quotes: NQuoteWithProducts[]) {
  }
}


