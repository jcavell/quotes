import * as mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote_request_id: String,
  quote_created: String,
  quote_products: [{
    productId: Number, name: String, sku: String, sage_sku: String, quantity: Number, unit_price: Number, originationPrice: Number
  }]
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
