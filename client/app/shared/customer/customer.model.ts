import _ from "lodash";

export class Customer {

  constructor(public id: number = undefined,
              public name: string = undefined,
              public canonicalName: string = '',
              public email: string = undefined,
              public directPhone: string = undefined,
              public mobilePhone: string = undefined,
              public source: string = undefined,
              public position: string = undefined,
              public isMainContact: boolean = true,
              public twitter: string = undefined,
              public facebook: string = undefined,
              public linkedIn: string = undefined,
              public skype: string = undefined,
              public companyId: number = undefined,
              public repId: number = undefined,
              public invoiceAddressId: number = undefined,
              public deliveryAddressId: number = undefined,
              public active: boolean = true
  ) {}


  isValid() {
    return _.isString(this.name) && _.isString(this.email) && _.isNumber(this.companyId);
  }

  isEmpty() {
    return this.id === undefined && this.name === undefined && this.email === undefined;
  }

  public isNew(): boolean {
      return this.id === undefined;
  }
}
