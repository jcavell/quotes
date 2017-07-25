import RepsCtrl from "./controllers/reps";
import QuotesCtrl from "./controllers/quotes";
import PenWarehouseProductsCtrl from "./controllers/penWarehouseProducts";

export default function setRoutes(app) {

  const reps = new RepsCtrl();
  const quotes = new QuotesCtrl();
  const penWarehouseProducts = new PenWarehouseProductsCtrl();


  // APIs
  app.route('/api/reps').get(reps.getAll);
  app.route('/api/reps/count').get(reps.count);
  app.route('/api/rep').post(reps.insert);
  app.route('/api/rep/:id').get(reps.get);
  app.route('/api/rep/:id').put(reps.update);
  app.route('/api/rep/:id').delete(reps.delete);

  app.route('/api/quote').post(quotes.insert);
  app.route('/api/quote/:id').put(quotes.update);
  app.route('/api/sendQuoteEmail').post(quotes.sendQuoteEmail);
  app.route('/api/quotes').get(quotes.getAll);

  app.route('/api/penwarehouseproducts').get(penWarehouseProducts.allProducts);
  app.route('/api/penwarehouseproducts/:sku').get(penWarehouseProducts.getBySku);
}
