import RepsCtrl from "./controllers/reps";
import QuotesCtrl from "./controllers/quotes";

export default function setRoutes(app) {

  const reps = new RepsCtrl();
  const quotes = new QuotesCtrl();

  // APIs
  app.route('/api/reps').get(reps.getAll);
  app.route('/api/reps/count').get(reps.count);
  app.route('/api/rep').post(reps.insert);
  app.route('/api/rep/:id').get(reps.get);
  app.route('/api/rep/:id').put(reps.update);
  app.route('/api/rep/:id').delete(reps.delete);

  app.route('/api/quote').post(quotes.insert);
  app.route('/api/quotes').get(quotes.getAll);
}
