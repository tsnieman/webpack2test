/* eslint-disable prefer-template */

import fs from 'fs';
import spdy from 'spdy';
import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackConfig from '../../config/webpack.config';

import {
  HTTP_PORT,
  HTTPS_PORT,
} from '../constants/server';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import httpsEverywhereMiddleware from './middleware/httpsEverywhere';
import securityMiddlewares from './middleware/security';
import compressionMiddleware from 'compression';

// Setup webpack
const compiler = webpack(webpackConfig);

// Setup the app.
// --------------
const app = express();

// Make sure the body is parsed before everything else (via https://github.com/analog-nico/hpp#getting-started)
app.use(bodyParser.urlencoded({ extended: true }));

// Hide software information to limit hacker insight.
app.disable('x-powered-by');

// Security middlewares
app.use(...securityMiddlewares);

// Compression middleware
app.use(compressionMiddleware());

// Redirect to HTTPS
app.all('*', httpsEverywhereMiddleware); // keep at top of routing calls

if (process.env.NODE_ENV === 'development') {
  // Dev middleware
  app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true,

    publicPath: webpackConfig.output.publicPath, // where bundles live

    historyApiFallback: true,

    stats: {
      colors: true,

      // Disable build noise.
      chunkModules: false,
      assets: false,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/public', express.static('public/built'));
}

app.use((req, res) => {
  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

  res.send(`
<html>
  <head>
    <meta name=viewport content="width=device-width, initial-scale=1" />
    <title>Sample App</title>

    ${
      Object.keys(assetsByChunkName)
        .map((name) => {
          const chunkPath = webpackConfig.output.publicPath + assetsByChunkName[name];

          if (chunkPath.endsWith('.css')) {
            return `<link rel="stylesheet" href="${chunkPath}"></link>`;
          }

          return '';
        }).join('\n    ') // prevents comma
    }
  </head>
  <body>
    <div id="app-index"></div>

    <script src="${webpackConfig.output.publicPath + 'commons.bundle.js'}"></script>

    ${
      Object.keys(assetsByChunkName)
        .map((name) => {
          if (assetsByChunkName[name] !== 'commons.bundle.js') { // TODO commons.bundle.js must come first, is handled manually.
            const chunkPath = webpackConfig.output.publicPath + assetsByChunkName[name];

            if (chunkPath.endsWith('.js')) {
              return `<script src="${chunkPath}"></script>`;
            }
          }

          return '';
        }).join('\n    ') // prevents comma.
    }
  </body>
</html>
  `);
});

// Launch http server.
// ---------------------------
http
  .createServer(app)
  .listen(HTTP_PORT, (err) => {
    if (err) {
      return console.error(err); // eslint-disable-line no-console
    }

    return console.log(`Listening at http://localhost:${HTTP_PORT}`); // eslint-disable-line no-console
  });

// Launch https server.
// ---------------------------
const sslOptions = {
  key: fs.readFileSync(`${__dirname}/key.pem`),
  cert: fs.readFileSync(`${__dirname}/cert.pem`),
  passphrase: process.env.SSL_CERT_PASS,
};

spdy
  .createServer(sslOptions, app)
  .listen(HTTPS_PORT, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return process.exit(1);
    }

    return console.log(`Listening at https://localhost:${HTTPS_PORT}`); // eslint-disable-line no-console
  });
