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
              public dateRequired: string,
              public customerName: string,
              public customerEmail: string,
              public createdDate: string,
              public active: boolean,
              public quoteMeta: QuoteMeta,
              public customer: Customer,
              public rep: User,
              public assignedUser: User,
              public invoiceAddress: Address,
              public deliveryAddress: Address) {
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
