export class Address {
  constructor(public id: number = undefined,
              public name: string = undefined,
              public company: string = undefined,
              public fao: string = undefined,
              public line1: string = undefined,
              public line2: string = undefined,
              public line3: string = undefined,
              public townCity: string = undefined,
              public county: string = undefined,
              public postcode: string = undefined,
              public country: string = 'United Kingdom',
              public active: boolean = true) {
  }
}
