import BaseCtrl from "./base";
import {GenericProduct} from "../models/genericProduct";
import PenWarehouseProduct, {PenWarehouseProductType} from "../models/penWarehouseProduct.model";


export class ProductFilters {
  colour: string;
  ink_colour: string;
  minimum_order_quantity: any;
  branding_method: string;
  parent_sku = {$ne: null};
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

  // Get by sku
  getBySku = (req, res) => {
    this.model.findOne({ sku: req.params.sku }, (err, obj) => {
      if (err) { return console.error(err); }
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // TODO fix this
      res.json(this.mapper(obj));
    });
  };

  getImageURL(image: String){
    return `pens.no-ip.org:82/magemaster/sys_exporters/get_image.php?file=${image}&rotation=55&width=600`;
  }

  mapper(penWareHouseProduct: PenWarehouseProductType) {
    const image = penWareHouseProduct.images ? this.getImageURL(penWareHouseProduct.images.single) : '';
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
      image,
      penWareHouseProduct.ink_colour,
      penWareHouseProduct.manufacturer,
      penWareHouseProduct.material,
      penWareHouseProduct.minimum_order_quantity,
      penWareHouseProduct.origination.platinum,
      tierPrices,
      penWareHouseProduct.weight);
  }
}


