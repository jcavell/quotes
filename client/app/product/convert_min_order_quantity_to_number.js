db.penwarehouseproducts.find().forEach(function(data) {
  db.penwarehouseproducts.update({
    "_id": data._id,
  }, {
    "$set": {
      "minimum_order_quantity": parseInt(data.minimum_order_quantity)
    }
  });
});
