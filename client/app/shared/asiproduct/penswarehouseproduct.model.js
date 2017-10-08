"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PensWarehouseProduct = (function () {
    function PensWarehouseProduct(id, sku, parent_sku, sage_sku, category, name, short_description, description, min_lead_time, max_lead_time, branding_area_title, branding_area_horizontal, branding_area_vertical, branding_method, colour, image, ink_colour, manufacturer, material, minimum_order_quantity, origination_price, prices, weight, stock_level, enough_stock, image_url) {
        this.id = id;
        this.sku = sku;
        this.parent_sku = parent_sku;
        this.sage_sku = sage_sku;
        this.category = category;
        this.name = name;
        this.short_description = short_description;
        this.description = description;
        this.min_lead_time = min_lead_time;
        this.max_lead_time = max_lead_time;
        this.branding_area_title = branding_area_title;
        this.branding_area_horizontal = branding_area_horizontal;
        this.branding_area_vertical = branding_area_vertical;
        this.branding_method = branding_method;
        this.colour = colour;
        this.image = image;
        this.ink_colour = ink_colour;
        this.manufacturer = manufacturer;
        this.material = material;
        this.minimum_order_quantity = minimum_order_quantity;
        this.origination_price = origination_price;
        this.prices = prices;
        this.weight = weight;
        this.stock_level = stock_level;
        this.enough_stock = enough_stock;
        this.image_url = image_url;
    }
    return PensWarehouseProduct;
}());
exports.PensWarehouseProduct = PensWarehouseProduct;
var PensWarehouseStock = (function () {
    function PensWarehouseStock(id, stock_level) {
        this.id = id;
        this.stock_level = stock_level;
    }
    return PensWarehouseStock;
}());
exports.PensWarehouseStock = PensWarehouseStock;
