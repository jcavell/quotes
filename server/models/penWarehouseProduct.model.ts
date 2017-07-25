import * as mongoose from "mongoose";

export class BrandingArea {
  constructor(public title: string, public horizontal: string, public vertical: string) {
  }
}

export class Origination {
  constructor(public platinum: number) {
  }
}

export class ProductImages {
  constructor(public single: string) {
  }
}

export class TierPrices {
  constructor(public platinum: Map<string, number>) {
  }
}

interface IPenWarehouseProduct extends mongoose.Document {
  parent_sku: string;
  sku: string;
  sage_sku: string;
  name: string;
  short_description: string;
  description: string;
  branding_method: string;
  branding_area: BrandingArea;
  colour: string;
  images: ProductImages;
  ink_colour: string;
  manufacturer: string;
  material: string;
  minimum_order_quantity: number;
  origination: Origination;
  weight: number;
  tier_prices: TierPrices;
}

export type PenWarehouseProductType = IPenWarehouseProduct & mongoose.Document;

const penWarehouseProductSchema = new mongoose.Schema({
  _id: Number, sku: String, parent_sku: String, sage_sku: String, name: String, short_description: String, minimum_order_quantity: Number, colour: String, ink_colour: String, branding_method: String, manufacturer: String, material: String, description: String, branding_area: {title: String, horizonal: String, vertical: String}, images: {single: String}, weight: Number, origination: {platinum: Number}, tier_prices :  { platinum : { 500: Number} }
  });

const PenWarehouseProduct: PenWarehouseProductType  = mongoose.model('PenWarehouseProduct', penWarehouseProductSchema);

export default PenWarehouseProduct;
