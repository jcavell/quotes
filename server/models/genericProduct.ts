export class GenericProduct {
  constructor(//public id: number,
              public sku: string,
              public parent_sku: string,
              public sage_sku: string,
              //             public category: string,
              public name: string,
              public short_description: string,
              public description: string,
              public min_lead_time: number,
              public max_lead_time: number,
              public branding_area_title: string,
              public branding_area_horizontal: string,
              public branding_area_vertical: string,
              public branding_method: string,
              public colour: string,
              public image: string,
              public ink_colour: string,
              public manufacturer: string,
              public material: string,
              public minimum_order_quantity: number,
              public origination_price: number,
              public prices: Map<string, number>,
              public weight: number
              // public stock_level: number,
              // public enough_stock: boolean,
              // public image_url: string
  ) {
  }
}
