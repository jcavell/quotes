import {User} from "../user/user.model";
import {Address} from "../address/address.model";
import {CustomerRecord} from "../customer/customerRecord.model";

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
              public active: boolean) {
  }
}

  export class QuoteRecord {
  constructor(public quote: Quote,
              public quoteMeta: QuoteMeta,
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
