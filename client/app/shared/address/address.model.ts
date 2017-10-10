export class Address {
  constructor(public id: number,
              public name: string,
              public company: string,
              public fao: string,
              public line1: string,
              public line2: string,
              public line3: string,
              public line4: string,
              public townCity: string,
              public county: string,
              public postcode: string,
              public country: string,
              public active: boolean) {
  }
}
