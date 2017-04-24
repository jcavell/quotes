"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product(id, sku, parent_sku, sage_sku, name, short_description, description, average_lead_time, branding_area_title, branding_area_horizontal, branding_area_vertical, branding_method, colour, image, ink_colour, manufacturer, material, minimum_order_quantity, prices, weight, stock_level, enough_stock) {
        this.id = id;
        this.sku = sku;
        this.parent_sku = parent_sku;
        this.sage_sku = sage_sku;
        this.name = name;
        this.short_description = short_description;
        this.description = description;
        this.average_lead_time = average_lead_time;
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
        this.prices = prices;
        this.weight = weight;
        this.stock_level = stock_level;
        this.enough_stock = enough_stock;
    }
    return Product;
}());
exports.Product = Product;
