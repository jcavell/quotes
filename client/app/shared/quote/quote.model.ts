import {User} from "../user/user.model";
import {Address} from "../address/address.model";
import {CustomerRecord} from "../customer/customerRecord.model";

export class Enquiry {
  constructor(public id: number,
              public enquiryId: number,
              public enquiryTimestamp: string,
              public productId: number,
              public sku: string,
              public productName: string,
              public supplier: string,
              public colour: string,
              public customerName: string,
              public customerTelephone: string,
              public customerEmail: string,
              public company: string,
              public requiredDate: string,
              public quantity: number,
              public repId: number,
              public repEmail: string,
              public source: string,
              public subject: string,
              public xsellProductIds: number[],
              public otherRequirements: string,
              public active: boolean) {
  }
}

export class QuoteMeta {
  constructor(public id: number,
              public status: string,
              public stage: string,
              public paymentStatus: string,
              public assignedGroup: string,
              public active: boolean) {
  }
}

export class Quote {
  constructor(public id: number,
              public title: string,
              public requiredDate: string,
              public specialInstructions: string,
              public createdDate: string,
              public notes: string,
              public customerId: number,
              public enquiryId: number,
              public repId: number,
              public repEmail: string,
              public active: boolean) {
  }
}

  export class QuoteRecord {
  constructor(public quote: Quote,
              public quoteMeta: QuoteMeta,
              public enquiry: Enquiry,
              public customerRecord: CustomerRecord,
              public invoiceAddress: Address,
              public deliveryAddress: Address,
              public rep: User,
              public assignedUser: User) {
  }
}


export class QuoteLineItem {
  constructor(public id: number,
              public productId: number,
              public quantity: number,
              public colour: string,
              public description: string,
              public priceIncludes: string,
              public cost: number,
              public markup: number,
              public sell: number,
              public vat: number) {
  }
}
