import {Customer} from "./customer.model";
import {Company} from "../company/company.model";
import {Address} from "../address/address.model";

export class CustomerRecord {
  constructor(public customer: Customer,
              public company: Company,
              public invoiceAddress: Address,
              public deliveryAddress: Address
  ) {

  }
}
