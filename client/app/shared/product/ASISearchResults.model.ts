export class ASISearchVirtualSampleImage {
  constructor(public Id: number,
              public Description: string,
              public ImageUrl: string,
              public isPrimary: boolean,
              public isVirtualSample: boolean) {
  }
}

export class ASISearchSupplier {
  constructor(public Id: number,
              public Name: string,
              public ASISearchNumber: string,) {
  }
}


export class ASISearchParentCategory {
  constructor(public Id: number,
              public Name: string) {
  }
}

export class ASISearchCategory {
  constructor(public Id: number,
              public Name: string,
              public Parent: ASISearchParentCategory) {
  }
}


export class ASISearchCharge {
  constructor(public TypeCode: string,
              public Type: string,
              public Description: string,
              public Prices: [ASISearchPrice]) {
  }
}



export class ASISearchPrice {
  constructor(public Quantity: number,
              public Price: number,
              public Cost: number,
              public DiscountCode: string,
              public CurrencyCode: string) {
  }
}

export class ASISearchLinks {
  constructor(
              public Self: string,
              public Next: string) {
  }
}


export class ASISearchResult {
  constructor(public Id: number,
              public Name: string,
              public Description: string,
              public ShortDescription: string,
              public Number: string,
              public Numbers: [String],
              public ImageUrl: String,
              public VirtualSampleImages: [ASISearchVirtualSampleImage],
              public Supplier: ASISearchSupplier,
              public Categories: [ASISearchCategory],
              public Price: ASISearchPrice,
              public IsConfirmed: boolean,
              public Query: string,
              public Breadcrumb: string,
              public Page: number,
              public ResultsPerPage: number,
              public ResultsTotal: number

  ) {
  }
}

export class ASISearchResults {
  constructor(public Results: [ASISearchResult]) {
  }
}
