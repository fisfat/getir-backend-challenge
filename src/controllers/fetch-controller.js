const { fetch } = require('../services/records');
const { ok, serverError } = require('../reusables/response');

const fetchRecords = async (req, res) => {
  try {
    const records = await fetch(req.body);
    return ok(res, records);
  } catch (err) {
    return serverError(req, res, err);
  }
};

module.exports = {
  fetchRecords
};
