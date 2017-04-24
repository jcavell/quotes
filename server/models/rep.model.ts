import * as mongoose from "mongoose";

const repSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Rep = mongoose.model('Rep', repSchema);

export default Rep;
