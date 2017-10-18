export class Customer {
  constructor(public id: number,
              public name: string,
              public email: string,
              public directPhone: string,
              public mobilePhone: string,
              public source: string,
              public position: string,
              public isMainContact: boolean,
              public twitter: string,
              public facebook: string,
              public linkedIn: string,
              public skype: string,
              public companyId: number,
              public repId: number,
              public invoiceAddressId: number,
              public deliveryAddressId: number,
              public active: boolean
  ) {

  }
}
