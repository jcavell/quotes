export class ASISearchProductionTimeItem {
  constructor(public Name: string,
              public Description: string,
              public Days: number
  ) {
  }
}

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


export class ASISearchAttribute {
  constructor(public Code: string,
              public Name: string) {
  }
}

export class ASISearchAttributes {
  constructor(public Colors: { 'Values': [ASISearchAttribute] },
              public Sizes: { 'Values': [ASISearchAttribute] },
              public Materials: { 'Values': [ASISearchAttribute] },
              public Shapes: { 'Values': [ASISearchAttribute] }) {
  }
}


export class ASISearchDimensions {
  constructor(public Description: string,
              public Length: string,
              public LengthUnit: string,
              public Width: string,
              public WidthUnit: string,
              public Height: string,
              public HeightUnit: string
  ) {
  }
}

export class ASISearchShipping {
  constructor(public Weight: {'Values': [ASISearchAttribute]},
              public WeightUnit: string,
              public WeightPerPackage: number,
              public ItemsPerPackage: number,
              public Dimensions: ASISearchDimensions,
              public BillsByWeight: boolean,
              public BillsBySize: boolean,
              public PackageInPlainBox: boolean
  ) {
  }
}

export class ASISearchCharge {
  constructor(public TypeCode: string,
              public Type: string,
              public Description: string,
              public Prices: [ASISearchPrice]) {
  }
}


export class ASISearchImprintingMethodOrService {
  constructor(public Code: string,
              public Name: string,
              public Charges: ASISearchCharge) {
  }
}
export class ASISearchImprinting {
  constructor(public Colors: { 'Values': [ASISearchAttribute] },
              public Methods: { 'Values': [ASISearchImprintingMethodOrService] },
              public Services: { 'Values': [ASISearchImprintingMethodOrService] },
              public Locations: {'Values': [String]},
              public Sizes: {'Values': [ASISearchAttribute]},
              public FullColorProcess: boolean,
              public Personalization: boolean,
              public SoldUnimprinted: boolean) {
  }
}


export class ASISearchQuantity {
  constructor(public From: number,
              public To: number) {
  }
}

export class ASISearchPrice {
  constructor(public Quantity: ASISearchQuantity,
              public Price: number,
              public Cost: number,
              public DiscountCode: string,
              public CurrencyCode: string,
              public IsQUR: boolean) {
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
              public Images: [String],
              public VirtualSampleImages: [ASISearchVirtualSampleImage],
              public Supplier: ASISearchSupplier,
              public Categories: [ASISearchCategory],
              public Attributes: ASISearchAttributes,
              public Imprinting: ASISearchImprinting,
              public Prices: [ASISearchPrice],
              public LowestPrice: ASISearchPrice,
              public HighestPrice: ASISearchPrice,
              public Shipping: ASISearchShipping,
              public HasRushService: boolean,
              public IsConfirmed: boolean,
              public Themes: [string],
              public ProductionTime: [ASISearchProductionTimeItem],
              public Origin: [String],
              public TradeNames: [String],
              public AdditionalInfo: string) {
  }
}

export class ASISearchResults {
  constructor(public Results: [ASISearchResult]) {
  }
}
