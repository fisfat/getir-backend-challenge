const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('../../swagger.json');

const { validate } = require('../validation/validator');
const { ok, notFound } = require('../reusables/response');
const { Router } = require('express');
const { fetchRecords } = require('../controllers/fetch-controller');

const recordRouter = new Router();

recordRouter.post('/', validate, fetchRecords);

const bind = (app) => {
  app.use(`/guide`, swaggerUI.serve, swaggerUI.setup(swaggerFile));
  app.use(`/`, (req, res) => res.status(200).json({ok: true, message: "Server available! Use /fetch endpoint to process requests. Go to /guide to see usage guide."}));
  app.use(`/fetch`, recordRouter);

  app.use((req, res) => notFound(res, 'Opps, page not found!'));
};

module.exports = {
  bind
};
