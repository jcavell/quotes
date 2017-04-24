import RepsCtrl from "./controllers/reps";

export default function setRoutes(app) {

  const reps = new RepsCtrl();

  // APIs
  app.route('/api/reps').get(reps.getAll);
  app.route('/api/reps/count').get(reps.count);
  app.route('/api/rep').post(reps.insert);
  app.route('/api/rep/:id').get(reps.get);
  app.route('/api/rep/:id').put(reps.update);
  app.route('/api/rep/:id').delete(reps.delete);
}
