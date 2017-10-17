import {User} from "../user/user.model";
import {Customer} from "../customer/customer.model";
import {Address} from "../address/address.model";
import {Company} from "../company/company.model";

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
              public companyName: string,
              public customerName: string,
              public customerEmail: string,
              public customerDirectPhone: string,
              public customerMobilePhone: string,
              public createdDate: string,
              public notes: string,
              public active: boolean) {
  }
}

  export class QuoteRecord {
  constructor(public quote: Quote,
              public quoteMeta: QuoteMeta,
              public customer: Customer,
              public company: Company,
              public rep: User,
              public assignedUser: User,
              public invoiceAddress: Address,
              public deliveryAddress: Address) {
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
