const { SERVER_ERROR, VALIDATION_ERROR, NOT_FOUND, RESPONSE_CODE } = require('./constants');


const ok = (res, records) => (
  res.status(200).json({
    code: RESPONSE_CODE.success.code,
    msg: RESPONSE_CODE.success.message,
    records,
  })
);

const notFound = (res, message) => (
  res.status(404).json({
    ...failure,
    error: NOT_FOUND,
    detail: message,
  })
);

const failure = {
  code: RESPONSE_CODE.failure.code,
  msg: RESPONSE_CODE.failure.message,
};

const badRequest = (res, message) => (
  res.status(400).json({
    ...failure,
    error: VALIDATION_ERROR,
    detail: message,
  })
);

const serverError = (req, res, error) => {
  const errorMessage = error.message || error;
  console.log("response:serverError:error <===>",{
    error: SERVER_ERROR,
    source: req.ip,
    message: errorMessage,
    stack: error.stack,
  });

  return res.status(500).json({
    ...failure,
    error: ERROR.SERVER_ERROR,
    detail: errorMessage,
  });
};

module.exports = {
  ok,
  notFound,
  badRequest,
  serverError,
};
