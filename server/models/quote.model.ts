import * as mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote_request_id: String,
  quote_created: Date,
  quote_status: {
    type: Number,
    enum: [1, 2, 3]
  },
  quote_products: [{
    productId: Number, name: String, sku: String, sage_sku: String, origination_price: Number, quantity: Number, unit_price: Number, markup: Number, image_url: String
  }]
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
