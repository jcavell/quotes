export class Customer {
  constructor(public id: number,
              public firstName: string,
              public lastName: string,
              public salutation: string,
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
              public handlerId: number,
              public companyId: number
  ) {

  }
}
