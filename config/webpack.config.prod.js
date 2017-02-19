'use strict';

const path = require('path');
const contextPath = path.resolve(__dirname, '..', 'src')

// Webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = {
  target: "web",

  // The 'base folder' for the app
  context: contextPath,

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: [
    '../src/app.js',
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
      filename: 'commons.js',
      minChunks: 2,
    }),

    new webpack.HotModuleReplacementPlugin(),

    // Recommended (NoErrorsPlugin is deprecated)
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate HTML to serve
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: path.join(__dirname, '..', 'public', 'images', 'favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    // Preload
    // https://github.com/googlechrome/preload-webpack-plugin
    // (TODO learn to configure this sensibly lol)
    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'asyncChunks'
    }),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "config"),
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
            },
          },
          "postcss-loader", // options in postcss.config.js
        ],
      },

      // Images
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
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
  devtool: false,

  // Performance budgets
  // https://medium.com/webpack/webpack-performance-budgets-13d4880fbf6d
  performance: {
    maxAssetSize: 100000, // in bytes (example: 10000 = 10kb)
    maxEntrypointSize: 300000, // in bytes (example: 10000 = 10kb)
    hints: 'warning'
  },
};
