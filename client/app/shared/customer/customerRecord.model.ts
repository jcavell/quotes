import {Customer} from "./customer.model";
import {Company} from "../company/company.model";
import {Address} from "../address/address.model";
import {Enquiry} from "../quote/quote.model";

export class CustomerRecord {
  constructor(public customer: Customer = new Customer(),
              public company: Company = new Company(),
              public enquiry: Enquiry = undefined,
              public invoiceAddress: Address = undefined,
              public deliveryAddress: Address = undefined
  ) {
  }
}
