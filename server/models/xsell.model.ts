import * as mongoose from "mongoose";

const xsellSchema = new mongoose.Schema({
  productId: Number
});

const Xsell = mongoose.model('Xsell', xsellSchema);

export default Xsell;
