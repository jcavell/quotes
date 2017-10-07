import QuotesCtrl from "./controllers/quotes";
import PenWarehouseProductsCtrl from "./controllers/penWarehouseProducts";

export default function setRoutes(app) {

  const quotes = new QuotesCtrl();
  const penWarehouseProducts = new PenWarehouseProductsCtrl();

  app.route('/api/quote').post(quotes.insert);
  app.route('/api/quote/:id').put(quotes.update);
  app.route('/api/sendQuoteEmail').post(quotes.sendQuoteEmail);
  app.route('/api/quotes').get(quotes.getAll);

  app.route('/api/penwarehouseproducts').get(penWarehouseProducts.allProducts);
  app.route('/api/penwarehouseproducts/:sku').get(penWarehouseProducts.getBySku);
}
