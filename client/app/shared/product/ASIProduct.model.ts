export class ASIProductionTimeItem {
  constructor(public Name: string,
              public Description: string,
              public Days: number) {
  }
}

export class ASIVirtualSampleImage {
  constructor(public Id: number,
              public Description: string,
              public ImageUrl: string,
              public isPrimary: boolean,
              public isVirtualSample: boolean) {
  }
}

export class ASISupplier {
  constructor(public Id: number,
              public Name: string,
              public asiNumber: string,) {
  }
}


export class ASIParentCategory {
  constructor(public Id: number,
              public Name: string) {
  }
}

export class ASICategory {
  constructor(public Id: number,
              public Name: string,
              public Parent: ASIParentCategory) {
  }
}


export class ASIAttribute {
  constructor(public Code: string,
              public Name: string) {
  }
}

export class ASIAttributes {
  constructor(public Colors: { 'Values': [ASIAttribute] },
              public Sizes: { 'Values': [ASIAttribute] },
              public Materials: { 'Values': [ASIAttribute] },
              public Shapes: { 'Values': [ASIAttribute] }) {
  }
}


export class ASIDimensions {
  constructor(public Description: string,
              public Length: string,
              public LengthUnit: string,
              public Width: string,
              public WidthUnit: string,
              public Height: string,
              public HeightUnit: string) {
  }
}

export class ASIShipping {
  constructor(public Weight: { 'Values': [ASIAttribute] },
              public WeightUnit: string,
              public WeightPerPackage: number,
              public ItemsPerPackage: number,
              public Dimensions: ASIDimensions,
              public BillsByWeight: boolean,
              public BillsBySize: boolean,
              public PackageInPlainBox: boolean) {
  }
}

export class ASICharge {
  constructor(public TypeCode: string,
              public Type: string,
              public Description: string,
              public Prices: [ASIPrice]) {
  }
}


export class ASIImprintingMethodOrService {
  constructor(public Code: string,
              public Name: string,
              public Charges: ASICharge) {
  }
}
export class ASIImprinting {
  constructor(public Colors: { 'Values': [ASIAttribute] },
              public Methods: { 'Values': [ASIImprintingMethodOrService] },
              public Services: { 'Values': [ASIImprintingMethodOrService] },
              public Locations: { 'Values': [String] },
              public Sizes: { 'Values': [ASIAttribute] },
              public FullColorProcess: boolean,
              public Personalization: boolean,
              public SoldUnimprinted: boolean) {
  }
}


export class ASIQuantity {
  constructor(public From: number,
              public To: number) {
  }
}

export class ASIPrice {
  constructor(public Quantity: ASIQuantity,
              public Price: number,
              public Cost: number,
              public DiscountCode: string,
              public CurrencyCode: string,
              public IsQUR: boolean) {
  }
}

export class ASIProduct {

  constructor(public Id: number,
              public Name: string,
              public Description: string,
              public ShortDescription: string,
              public Number: string,
              public Numbers: [String],
              public ImageUrl: String,
              public Images: [String],
              public VirtualSampleImages: [ASIVirtualSampleImage],
              public Supplier: ASISupplier,
              public Categories: [ASICategory],
              public Attributes: ASIAttributes,
              public Imprinting: ASIImprinting,
              public Prices: [ASIPrice],
              public LowestPrice: ASIPrice,
              public HighestPrice: ASIPrice,
              public Shipping: ASIShipping,
              public HasRushService: boolean,
              public IsConfirmed: boolean,
              public Themes: [string],
              public ProductionTime: [ASIProductionTimeItem],
              public Origin: [String],
              public TradeNames: [String],
              public AdditionalInfo: string) {
  }
}
//
// {

//   "Supplier": {
//   "Id": 7587,
//     "Name": "Admints & Zagabor Powered By HIT",
//     "AsiNumber": "31516",
//     "Phone": {
//     "Work": "(856) 931-7300",
//       "TollFree": "(866) 556-4687",
//       "Primary": "(856) 931-7300",
//       "$index": 1
//   },
//   "Fax": {
//     "Work": "(856) 931-7384",
//       "Primary": "(856) 931-7384",
//       "$index": 1
//   },
//   "Email": "info@admints.com",
//     "Emails": [
//     "info@admints.com",
//     "orders@admints.com"
//   ],
//     "Websites": [
//     "http://www.admints.com",
//     "admints.asisupplier.com",
//     "31516.asisupplier.com",
//     "http://31516.espwebsite.com"
//   ],
//     "Rating": {
//     "Rating": 9,
//       "Companies": 14,
//       "Transactions": 20
//   },
//   "MarketingPolicy": "Supplier indicates they sell advertising specialties exclusively through distributors and/or incentive resellers",
//     "HasNotes": false
// },
//   "LineNames": [
//   "Admints & Zagabor"
// ],
//   "Catalog": {
//   "Id": 205833,
//     "Name": "Admints & Zagabor 2016",
//     "Year": "2016",
//     "Asset": "ASI/31516-205833 2016 Admints and Zagabor",
//     "MaskedAsset": "ASI/31516-205833 2016 Admints and Zagabor-M",
//     "CompanyId": 0,
//     "ProductCount": 0,
//     "EndUserSafe": false
// },
//   "Categories": [
//   {
//     "Id": "P02938103",
//     "Name": "Ballpoint-plunger Action",
//     "Parent": {
//       "Id": "P02930003",
//       "Name": "Pens"
//     }
//   },
//   {
//     "Id": "P02943603",
//     "Name": "Ballpoint-with Grip Section",
//     "Parent": {
//       "Id": "P02930003",
//       "Name": "Pens"
//     }
//   }
// ],
//   "Themes": [
//   "Organizations",
//   "Grand-Openings",
//   "Seminars"
// ],
//   "Origin": [
//   "ASIA",
//   "CHINA"
// ],
//   "TradeNames": [
//   "Pens O' Plenty"
// ],
//   "ProductionTime": [
//   {
//     "Name": "7 business days",
//     "Description": "7-10",
//     "Days": 7
//   }
// ],
//   "Attributes": {
//   "Colors": {
//     "Values": [
//       {
//         "Code": "MEYE",
//         "Name": "Translucent Yellow",
//         "$index": 3
//       },
//       {
//         "Code": "MERD",
//         "Name": "Translucent Red"
//       },
//       {
//         "Code": "MEPK",
//         "Name": "Transulcent Pink"
//       },
//       {
//         "Code": "MEOG",
//         "Name": "Translucent Orange"
//       },
//       {
//         "Code": "MEGN",
//         "Name": "Translucent Green"
//       },
//       {
//         "Code": "UNCL",
//         "Name": "Translucent Charcoal"
//       },
//       {
//         "Code": "DRRD",
//         "Name": "Translucent Burgundy"
//       },
//       {
//         "Code": "MEBL",
//         "Name": "Translucent Blue"
//       },
//       {
//         "Code": "MEGR",
//         "Name": "Silver satin"
//       },
//       {
//         "Code": "MEPL",
//         "Name": "Translucent Purple"
//       }
//     ]
//   },
//   "Sizes": {
//     "Values": [
//       {
//         "Code": "NJZM",
//         "Name": "5 1/2 \"",
//         "$index": 3
//       }
//     ]
//   },
//   "Materials": {
//     "Values": [
//       {
//         "Code": "$03D",
//         "Name": "Plastic",
//         "$index": 3
//       }
//     ]
//   },
//   "Shapes": {
//     "Values": [
//       {
//         "Code": "BUSI",
//         "Name": "Pen",
//         "$index": 3
//       }
//     ]
//   }
// },
//   "Imprinting": {
//   "Colors": {
//     "Values": [
//       {
//         "Code": "$2HM",
//         "Name": "Athletic Gold",
//         "$index": 3
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Orange"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Red"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Pink"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Maroon"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Purple"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Yellow"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Process Blue"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Royal Blue"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Light Blue"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Navy Blue"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Kelly Green"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Forest Green"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Teal"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Tan"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Brown"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Gray"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Black"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "White"
//       },
//       {
//         "Code": "$2HM",
//         "Name": "Burgundy"
//       }
//     ]
//   },
//   "Methods": {
//     "Values": [
//       {
//         "Code": "$0TW",
//         "Name": "Silkscreen imprint on ballpoint pens",
//         "Charges": [
//           {
//             "TypeCode": "RDCH",
//             "Type": "Re-order Charge",
//             "Description": "Re-order Setup on Silkscreen imprint on satin ballpoint pens",
//             "Prices": [
//               {
//                 "Quantity": {
//                   "From": 1,
//                   "To": 2147483647,
//                   "$index": 1
//                 },
//                 "Price": 25,
//                 "Cost": 20,
//                 "DiscountCode": "V",
//                 "CurrencyCode": "USD",
//                 "IsQUR": false
//               }
//             ],
//             "IsRequired": true
//           },
//           {
//             "TypeCode": "IMCH",
//             "Type": "Imprint Method Charge",
//             "Description": "Silkscreen imprint on satin ballpoint pens",
//             "Prices": [
//               {
//                 "Quantity": {
//                   "From": 1,
//                   "To": 2147483647,
//                   "$index": 1
//                 },
//                 "Price": 40,
//                 "Cost": 32,
//                 "DiscountCode": "V",
//                 "CurrencyCode": "USD",
//                 "IsQUR": false
//               }
//             ],
//             "IsRequired": true
//           }
//         ],
//         "$index": 3
//       }
//     ]
//   },
//   "Services": {
//     "Values": [
//       {
//         "Code": "$2HH",
//         "Name": "Paper Proof",
//         "Charges": [
//           {
//             "TypeCode": "ARCH",
//             "Type": "Artwork Charge",
//             "Description": "Paper Proof on satin ballpoint pens",
//             "Prices": [
//               {
//                 "Quantity": {
//                   "From": 1,
//                   "To": 2147483647,
//                   "$index": 1
//                 },
//                 "Price": 15,
//                 "Cost": 12,
//                 "DiscountCode": "V",
//                 "CurrencyCode": "USD",
//                 "IsQUR": false
//               }
//             ],
//             "IsRequired": true
//           }
//         ],
//         "$index": 3
//       }
//     ]
//   },
//   "Sizes": {
//     "Values": [
//       {
//         "Code": "$2HQ",
//         "Name": "1 1/4\" W x 1/2\" H",
//         "$index": 3
//       }
//     ]
//   },
//   "Locations": {
//     "Values": [
//       "on ballpoint pens"
//     ]
//   },
//   "FullColorProcess": false,
//     "Personalization": false,
//     "SoldUnimprinted": false
// },
//   "Options": [
//   {
//     "Name": "Trim color options",
//     "Type": "Product Option",
//     "Values": [
//       "Translucent Blue -  Matching rubber grip and Silver trim",
//       "Translucent Burgundy -  Matching rubber grip and Silver trim",
//       "Translucent Charcoal -  Matching rubber grip and Silver trim",
//       "Translucent Green -  Matching rubber grip and Silver trim",
//       "Translucent Orange -  Matching rubber grip and Silver trim",
//       "Translucent Pink -  Matching rubber grip and Silver trim",
//       "Translucent Purple -   Matching rubber grip and Silver trim",
//       "Translucent Red -  Matching rubber grip and Silver trim",
//       "Translucent Yellow - Matching rubber grip and Silver trim",
//       "Transluent Lime Green -  Matching rubber grip and Silver trim"
//     ]
//   },
//   {
//     "Name": "Less Than Minimum",
//     "Groups": [
//       {
//         "Name": "Unless otherwise specified for all products. EQP will not apply; first column pricing will be used. Absolute minimum on any style is half the regular minimum unless otherwise specified. On all Ceramic and Embroidery items NO LESS THAN MINIMUM ALLOWED. These orders are sold in full carton quantities only.",
//         "Charges": [
//           {
//             "TypeCode": "PROP",
//             "Type": "Product Option Charge",
//             "Description": "Less than minimum, EQP on satin ballpoint pens",
//             "Prices": [
//               {
//                 "Quantity": {
//                   "From": 1,
//                   "To": 2147483647,
//                   "$index": 1
//                 },
//                 "Price": 50,
//                 "Cost": 40,
//                 "DiscountCode": "V",
//                 "CurrencyCode": "USD",
//                 "IsQUR": false
//               }
//             ],
//             "IsRequired": true
//           }
//         ]
//       }
//     ]
//   }
// ],
//   "Packaging": [
//   {
//     "Type": "Packaging",
//     "Values": [
//       "Bulk"
//     ]
//   }
// ],
//   "Shipping": {
//   "Weight": {
//     "Values": [
//       {
//         "Code": "$2I9",
//         "Name": "9 lbs",
//         "$index": 3
//       }
//     ]
//   },
//   "WeightUnit": "Pounds",
//     "WeightPerPackage": 9,
//     "ItemsPerPackage": 250,
//     "Dimensions": {
//     "Description": "12 \" x 10 \" x 6 \"",
//       "Length": "12",
//       "LengthUnit": "Inches",
//       "Width": "10",
//       "WidthUnit": "Inches",
//       "Height": "6",
//       "HeightUnit": "Inches"
//   },
//   "BillsByWeight": false,
//     "BillsBySize": false,
//     "PackageInPlainBox": false
// },
//   "VariantId": 0,
//   "Prices": [
//   {
//     "Quantity": {
//       "From": 250,
//       "To": 499,
//       "$index": 1
//     },
//     "Price": 0.68,
//     "Cost": 0.408,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
//   },
//   {
//     "Quantity": {
//       "From": 500,
//       "To": 999,
//       "$index": 1
//     },
//     "Price": 0.59,
//     "Cost": 0.354,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
//   },
//   {
//     "Quantity": {
//       "From": 1000,
//       "To": 2499,
//       "$index": 1
//     },
//     "Price": 0.52,
//     "Cost": 0.312,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
//   },
//   {
//     "Quantity": {
//       "From": 2500,
//       "To": 4999,
//       "$index": 1
//     },
//     "Price": 0.45,
//     "Cost": 0.27,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
//   },
//   {
//     "Quantity": {
//       "From": 5000,
//       "To": 2147483647,
//       "$index": 1
//     },
//     "Price": 0.39,
//     "Cost": 0.234,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
//   }
// ],
//   "LowestPrice": {
//   "Quantity": {
//     "From": 5000,
//       "To": 2147483647,
//       "$index": 1
//   },
//   "Price": 0.39,
//     "Cost": 0.234,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
// },
//   "HighestPrice": {
//   "Quantity": {
//     "From": 250,
//       "To": 499,
//       "$index": 1
//   },
//   "Price": 0.68,
//     "Cost": 0.408,
//     "DiscountCode": "R",
//     "CurrencyCode": "USD",
//     "IsQUR": false
// },
//   "IsNew": false,
//   "IsConfirmed": true,
//   "HasFullColorProcess": false,
//   "HasRushService": false,
//   "ConfigurationId": "",
//   "AdditionalInfo": "Black Ink - Medium Point on satin ballpoint pens",
//   "UpdateDate": "2017-06-27T17:51:15.000-04:00",
//   "IsAssembled": true
// }


