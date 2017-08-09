import XsellsCtrl from "./controllers/xsells";
import QuotesCtrl from "./controllers/quotes";
import PenWarehouseProductsCtrl from "./controllers/penWarehouseProducts";

export default function setRoutes(app) {

  const xsells = new XsellsCtrl();
  const quotes = new QuotesCtrl();
  const penWarehouseProducts = new PenWarehouseProductsCtrl();


  // APIs
  app.route('/api/xsells').get(xsells.getAll);
  app.route('/api/xsells/count').get(xsells.count);
  app.route('/api/xsell').post(xsells.insert);
  app.route('/api/xsell/:id').get(xsells.get);
  app.route('/api/xsell/:id').put(xsells.update);
  app.route('/api/xsell/:id').delete(xsells.delete);

  app.route('/api/quote').post(quotes.insert);
  app.route('/api/quote/:id').put(quotes.update);
  app.route('/api/sendQuoteEmail').post(quotes.sendQuoteEmail);
  app.route('/api/quotes').get(quotes.getAll);

  app.route('/api/penwarehouseproducts').get(penWarehouseProducts.allProducts);
  app.route('/api/penwarehouseproducts/:sku').get(penWarehouseProducts.getBySku);
}
