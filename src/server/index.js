const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');

const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

const {
  HTTP_PORT,
  HTTPS_PORT,
} = require('../constants/server');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const ensureSecureMiddleware = function ensureSecureMiddleware(req, res, next) {
  if (req.secure) {
    // OK, continue
    return next();
  }

  // handle port numbers if you need non defaults
  return res.redirect(`https://${req.hostname}:${HTTPS_PORT}${req.url}`); // express 4.x
};

// Setup the app.
// --------------
const app = express();

// Redirect to HTTPS
app.all('*', ensureSecureMiddleware); // keep at top of routing calls

if (process.env.NODE_ENV === 'development') {
  // Setup webpack
  const compiler = webpack(webpackConfig);

  // Dev middleware
  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath, // where bundles live

    historyApiFallback: true,

    stats: {
      colors: true,

      // Disable build noise.
      chunkModules: false,
      assets: false,
    },
  }));

  app.use(hotMiddleware(compiler));
} else {
  app.use('/public', express.static('public/built'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'built', 'index.html'));
});

// Launch http server.
// ---------------------------
app.listen(HTTP_PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`Listening at http://localhost:${HTTP_PORT}`);
});

// Launch https server.
// ---------------------------
const sslOptions = {
  key: fs.readFileSync(`${__dirname}/key.pem`),
  cert: fs.readFileSync(`${__dirname}/cert.pem`),
  passphrase: process.env.SSL_CERT_PASS,
};

const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(HTTPS_PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`Listening at https://localhost:${HTTPS_PORT}`);
});
