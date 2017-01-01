'use strict';

const path = require('path');

// Webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The 'base folder' for the app
  context: path.resolve(__dirname, '..', 'src'),

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    '../src/index.js',
  ],

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, '..', 'built'),
    filename: '[name].bundle.js',
    publicPath: '/built/', // as it will be served
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

    // https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    // (added per webpack-hot-middleware example)
    new webpack.NoErrorsPlugin(),

    // Generate HTML to serve
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "config"),
    ],
  },

  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'react-css-modules',
                {
                  // TODO  want to use something more like '[path]__[name]__[local]___[hash:base64:5]'
                  // but it seems that the react css modules babel plugin  includes 'src' as part
                  // of [path] and the css loader doesn't ... need to "align" them.
                  generateScopedName: '[name]__[local]',
                }
              ],
              'react-hot-loader/babel',
            ],

            presets: [
              [
                'es2015',
                {
                  // loose: true, // seems to be encouraged TODO more research
                  modules: false, // "Webpack 2 in ES modules mode" aka native es2015 modules (for tree shaking)
                },
              ],
              'stage-0',
              'react',
            ],
          },
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
              // TODO  want to use something more like '[path]__[name]__[local]___[hash:base64:5]'
              // but it seems that the react css modules babel plugin  includes 'src' as part
              // of [path] and the css loader doesn't ... need to "align" them.
              localIdentName: '[name]__[local]',
            },
          }
        ],
      },
    ],
  },

  // Source maps
  devtool: 'cheap-module-eval-source-map',
};
