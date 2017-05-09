import BaseCtrl from "./base";
import {GenericProduct} from "../models/genericProduct";
import PenWarehouseProduct, {PenWarehouseProductType} from "../models/penWarehouseProduct.model";


export class ProductFilters {
  colour: string;
  ink_colour: string;
  minimum_order_quantity: any;
  branding_method: string;
}

export default class PenWarehouseProductsCtrl extends BaseCtrl {
  model = PenWarehouseProduct;

  allProducts = (req, res) => {
    const filters = new ProductFilters();
    if (req.query.colour) {
      filters.colour = req.query.colour;
    }
    if (req.query.ink_colour) {
      filters.ink_colour = req.query.ink_colour;
    }
    if (req.query.order_quantity) {
      filters.minimum_order_quantity = { $lte: req.query.order_quantity };
    }
    if (req.query.branding_method) {
      filters.branding_method = req.query.branding_method;
    }

    const query = this.model.find(filters).limit(100);
    query.count((err, count) => {
      // query.skip(page * take).limit(take).exec('find', function (err, docs) {
        query.exec('find', (err2, docs) => {
        if (err2) {
          return res.status(400).send({message: JSON.stringify(err2)});
        } else {
          // res.json({count: count, docs: docs});
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // TODO fix this
          res.json(docs.map(p => this.mapper(p)));
        }
      });
    });
  }

  mapper(penWareHouseProduct: PenWarehouseProductType) {
    const tierPrices = penWareHouseProduct.tier_prices.platinum;
    return new GenericProduct(
      penWareHouseProduct.sku,
      penWareHouseProduct.parent_sku,
      penWareHouseProduct.sage_sku,
      penWareHouseProduct.name,
      penWareHouseProduct.short_description,
      penWareHouseProduct.description,
      3,
      10,
      penWareHouseProduct.branding_area.title,
      penWareHouseProduct.branding_area.horizontal,
      penWareHouseProduct.branding_area.vertical,
      penWareHouseProduct.branding_method,
      penWareHouseProduct.colour,
      penWareHouseProduct.image.single,
      penWareHouseProduct.ink_colour,
      penWareHouseProduct.manufacturer,
      penWareHouseProduct.material,
      penWareHouseProduct.minimum_order_quantity,
      penWareHouseProduct.origination.platinum,
      tierPrices,
      penWareHouseProduct.weight);
  }
}


