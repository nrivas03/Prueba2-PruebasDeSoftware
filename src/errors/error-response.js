import log from '../configs/log';

class HTTPError extends Error {
  constructor({ name, message, code }) {
    super();
    this.name = name;
    this.msg = message;
    this.statusCode = code;
  }
}

/**
 * Error reusable response
 * @param {Error} error - Error instance
 * @param {express.Response} res - Express response
 * @returns {express.Response} express response with status code and error json
 */
function returnErrorResponse({ error, res }) {
  log.error(error);

  if (error instanceof HTTPError) {
    const { statusCode } = error;
    return res.status(statusCode).send({ error: { ...error } });
  }
  //   if (error instanceof JsonWebTokenError) {
  //     const jwtError = new HTTPError({
  //       name: error.name,
  //       msg: error.message,
  //       code: 403,
  //     });
  //     return res.status(403).json({ error: { ...jwtError } });
  //   }
  return res.status(500).send({ error: error.toString() });
}

export { HTTPError, returnErrorResponse };
