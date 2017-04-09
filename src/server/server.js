/* eslint-disable prefer-template */

import fs from 'fs';
import path from 'path';
import spdy from 'spdy';
import http from 'http';

import express from 'express';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackConfig from '../../config/webpack.config';

// import Helmet from 'react-helmet';

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
    publicPath: webpackConfig.output.publicPath, // where bundles live

    historyApiFallback: true,

    // hot: true,

    stats: {
      colors: true,

      // Disable build noise.
      chunkModules: false,
      assets: false,
    },
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  // Webpack public path (aka webpack build location)
  app.use(webpackConfig.output.publicPath, express.static(path.join(__dirname, '/../../public/built')));
}

// General image access, nothing fancy.
app.use('/public/images', express.static(path.join(__dirname, '/../../public/images')));

// TODO get some favicon middleware. there's like a billion favicons these days, holy cow.
app.use('/public/images/favicon.png', express.static(path.join(__dirname, '/../../public/images/reactjs.png')));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'public/built' });
});
/*
app.get('*', (req, res) => {
  const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  const clientOptions = {
    initialLocation: req.path,
  };

  const theClient = evalBundleCode(requestUrl).default(clientOptions);
  const appBody = renderToString(theClient);

  // "you have to make sure to call rewind on server, or you'll get a memory leak."
  // https://github.com/nfl/react-helmet#server-usage
  const head = Helmet.rewind();

  const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

  res.send(`
<html>
  <head ${head.htmlAttributes.toString()}>
    <meta name=viewport content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" type="image/png" href="/public/images/favicon.png"/>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${head.base.toString()}

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
    <div id="app-index">${appBody}</div>

    ${
      Object.keys(assetsByChunkName)
        .map((name) => {
          const chunkPath = webpackConfig.output.publicPath + assetsByChunkName[name];

          if (chunkPath.endsWith('.js')) {
            return `<script src="${chunkPath}"></script>`;
          }

          return '';
        }).join('\n    ') // prevents comma.
    }
  </body>
</html>
  `);
});
*/

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
