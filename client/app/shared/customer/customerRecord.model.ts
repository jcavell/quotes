import {Customer} from "./customer.model";
import {Company} from "../company/company.model";
import {Address} from "../address/address.model";
import _ from "lodash";

export class CustomerRecord {
  constructor(public customer: Customer = new Customer(),
              public company: Company = new Company(),
              public invoiceAddress: Address = undefined,
              public deliveryAddress: Address = undefined,
              public alerts: IAlert[] = []
  ) {}


  isEqual(customer: Customer, company: Company, invoiceAddress: Address, deliveryAddress: Address) {
    return this.customer.isEqual(customer) &&
    _.isEqual(this.invoiceAddress, invoiceAddress) &&
    _.isEqual(this.deliveryAddress, deliveryAddress) &&
    _.isEqual(this.company, company);
  }
}


export interface IAlert {
  id: number;
  type: string;
  message: string;
}
