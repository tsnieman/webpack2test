/* eslint-disable prefer-template */

import path from 'path';
import spdy from 'spdy';

import express from 'express';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackConfig from '../../config/webpack.config';

// import Helmet from 'react-helmet';

import {
  HTTP_PORT,
} from '../constants/server';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
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

// Launch http server.
// ---------------------------
spdy
  .createServer(app)
  .listen(HTTP_PORT, (err) => {
    if (err) {
      console.error(err); // eslint-disable-line no-console
      return process.exit(1);
    }

    return console.log(`Listening at http://localhost:${HTTP_PORT}`); // eslint-disable-line no-console
  });
