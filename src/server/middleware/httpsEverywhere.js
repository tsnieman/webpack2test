const {
  HTTPS_PORT,
} = require('../../constants/server');

const httpsEverywhereMiddleware = function httpsEverywhereMiddleware(req, res, next) {
  if (req.secure) {
    return next();
  }

  return res.redirect(`https://${req.hostname}:${HTTPS_PORT}${req.url}`);
};

module.exports = httpsEverywhereMiddleware;
