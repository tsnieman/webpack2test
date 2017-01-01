var path = require('path');
var webpack = require('webpack');
var express = require('express');
var devMiddleware = require('webpack-dev-middleware');
var hotMiddleware = require('webpack-hot-middleware');
var config = require('./config/webpack.config');

var app = express();
var compiler = webpack(config);

var PORT = 4200

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath, // where bundles live

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

app.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:' + PORT);
});
