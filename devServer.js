var path = require('path');
var fs = require('fs');
var https = require('https');
var webpack = require('webpack');
var express = require('express');

var HTTP_PORT = 4200;
var HTTPS_PORT = 8443;

var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');

var ensureSecureMiddleware = function ensureSecureMiddleware(req, res, next){
  if(req.secure){
    // OK, continue
    return next();
  };
  // handle port numbers if you need non defaults
  res.redirect(`https://${req.hostname}:${HTTPS_PORT}${req.url}`); // express 4.x
};

// Setup webpack
var webpackConfig = require('./config/webpack.config');
var compiler = webpack(webpackConfig);

// Setup the app.
// --------------
var app = express();

// Redirect to HTTPS
app.all('*', ensureSecureMiddleware); // keep at top of routing calls

app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, // where bundles live

  historyApiFallback: true,

  stats: {
    colors: true,

    // Disable build noise.
    chunkModules: false,
    assets: false,
  }
}));

app.use(hotMiddleware(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'built', 'index.html'));
});

// Launch http server.
// ---------------------------
app.listen(HTTP_PORT, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:' + HTTP_PORT);
});

// Launch https server.
// ---------------------------
var sslOptions = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem'),
	passphrase: process.env.SSL_CERT_PASS
};

var httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(HTTPS_PORT, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at https://localhost:' + HTTPS_PORT);
});
