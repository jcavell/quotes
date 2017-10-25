import {Customer} from "./customer.model";
import {Company} from "../company/company.model";
import {Address} from "../address/address.model";

export class CustomerRecord {
  constructor(public customer: Customer = new Customer(),
              public company: Company = new Company(),
              public invoiceAddress: Address = undefined,
              public deliveryAddress: Address = undefined
  ) {
  }
}
