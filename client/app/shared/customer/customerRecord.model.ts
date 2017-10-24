import {Customer} from "./customer.model";
import {Company} from "../company/company.model";
import {Address} from "../address/address.model";

export class CustomerRecord {
  constructor(public customer: Customer = new Customer(),
              public company: Company = new Company(),
              public invoiceAddress: Address = undefined,
              public deliveryAddress: Address = undefined,
              public alerts: IAlert[] = []) {
  }
}


export interface IAlert {
  id: number;
  type: string;
  message: string;
}
