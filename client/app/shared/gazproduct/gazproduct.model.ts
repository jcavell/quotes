export class GazImage {
  constructor(public imageid: number,
              public id: number,
              public priority: number,
              public type: string,
              public imagesize: string,
              public caption: string) {
  }
}

export class GazPrice {
  constructor(public priceid: number,
              public price: number,
              public markup: number,
              public qty: number) {
  }
}

export class GazProduct {
  constructor(public productid: number = undefined,
              public brandid: number = undefined,
              public supplierid: number = undefined,
              public productcode: string = undefined,
              public productname: string = undefined,
              public description1: string = undefined,
              public images: GazImage[] = undefined,
              public prices: GazPrice[] = undefined) {
  }
}
