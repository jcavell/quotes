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
  constructor(public productid: number,
              public brandid: number,
              public supplierid: number,
              public productcode: string,
              public productname: string,
              public description1: string,
              public images: GazImage[],
              public prices: GazPrice[]) {
  }
}
