const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackConfig = require('../../config/webpack.config');

const {
  HTTP_PORT,
  HTTPS_PORT,
} = require('../constants/server');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const httpsEverywhereMiddleware = require('./middleware/httpsEverywhere');
const securityMiddlewares = require('./middleware/security');

// Setup the app.
// --------------
const app = express();

// Make sure the body is parsed before everything else (via https://github.com/analog-nico/hpp#getting-started)
app.use(bodyParser.urlencoded({ extended: true }));

// Security middlewares
app.use(...securityMiddlewares);

// Redirect to HTTPS
app.all('*', httpsEverywhereMiddleware); // keep at top of routing calls

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
