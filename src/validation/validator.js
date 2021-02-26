const { badRequest } = require('../reusables/response');
const joi = require('joi');

const dateValidator = (dateArg) => {
  if (!dateArg.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
    throw new Error('Date format is invalid. Valid format is "YYYY-MM-DD"');
  }
  return dateArg;
};

const requestSchema = joi.object({
  startDate: joi.custom(dateValidator).required(),
  endDate: joi.custom(dateValidator).required(),
  minCount: joi.number().integer().required(),
  maxCount: joi.number().integer().required(),
});

const validate = async (req, res, next) => {
  try {
    await requestSchema.validateAsync(req.body, { abortEarly: false, convert: false });
    return next();
  } catch (err) {
    return badRequest(res, err.message);
  }
};

module.exports = {
  validate,
};
