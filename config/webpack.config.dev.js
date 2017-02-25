'use strict';

const path = require('path');
const contextPath = path.resolve(__dirname, '..', 'src')

// Webpack
const webpack = require('webpack');

module.exports = {
  // The 'base folder' for the app
  context: contextPath,

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    '../src/index.js',
  ],

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, '..', 'public', 'built'),
    filename: '[name].bundle.js',
    publicPath: '/public/', // as it will be served
    chunkFilename: '[name]-[chunkhash].js',
  },

  plugins: [
    // COMMON CHUNKS
    // any modules that get loaded ${minChunks} or more times,
    // it will bundle that into a commons.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: '[name].bundle.js',
      minChunks: 2,
    }),

    new webpack.HotModuleReplacementPlugin(),

    // Recommended (NoErrorsPlugin is deprecated)
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      'node_modules',
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'config'),
      path.resolve(__dirname, '..', 'public'),
    ],

    // Seems to resolve a "Can't resolve './Header'" (i.e. index) error from webpack
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      // Javascript
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /node_modules/,
        ],
        use: [{
          loader: 'babel-loader',
          // options in .babelrc
        }],
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
            },
          },
          'postcss-loader', // options in postcss.config.js
        ],
      },

      // Images
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        use: [
        // TODO decide between file-loader and url-loader
        // .. not sure which is "better"
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
          //{
            //loader: 'url-loader',
            //options: {},
          //},
        ],
      },
    ],
  },

  // Source maps
  devtool: 'cheap-module-eval-source-map',

  // Performance budgets
  // https://medium.com/webpack/webpack-performance-budgets-13d4880fbf6d
  performance: {
    maxAssetSize: 100000, // in bytes (example: 10000 = 10kb)
    maxEntrypointSize: 300000, // in bytes (example: 10000 = 10kb)
    hints: 'warning'
  },
};
