var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.config.js');

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, 'built'), // where index.html lives
  publicPath: config.output.publicPath, // where bundles live

  // Need historyApiFallback to be able to refresh on dynamic route
  historyApiFallback: { disableDotRule: true },

  stats: {
    colors: true,

    // Disable build noise.
    chunkModules: false,
    assets: false,
  }
}).listen(4200, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:4200');
});
