export class Company {
  constructor(public id: number = undefined,
              public name: string = '',
              public phone1: string = undefined,
              public phone2: string = undefined,
              public phone3: string = undefined,
              public website: string = undefined,
              public twitter: string = undefined,
              public facebook: string = undefined,
              public linkedIn: string = undefined,
              public source: string = undefined,
              public active: boolean = true

  ) {

  }
}
