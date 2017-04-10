'use strict';

const path = require('path');
const contextPath = path.resolve(__dirname, '../src')

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // The 'base folder' for the app
  context: contextPath,

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: {
    vendor: [
      'lodash',
      'react',
      'react-dom',
      'react-router-dom',
      'react-helmet',
    ],

    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../src/index.jsx')
    ]
  },

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, '../public/built'),
    filename: '[name].bundle.js',
    publicPath: '/public/built/', // as it will be served
    chunkFilename: '[name]-[chunkhash].js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    // Recommended (NoErrorsPlugin is deprecated)
    new webpack.NoEmitOnErrorsPlugin(),

    // COMMON CHUNKS
    // any modules that get loaded ${minChunks} or more times,
    // it will bundle that into a commons.js
    // TODO use https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318#.bl0jid69f
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.bundle.js',
      minChunks: 2,
    }),

    // TODO Not sure why "async" can't be used in the other CommonsChunkPlugin block...?
    // Related..? https://github.com/webpack/webpack/issues/1812#issuecomment-168078904
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
    }),

    // Generate HTML to serve
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: path.join(__dirname, '..', 'public', 'images', 'favicon.ico'),
      // chunks: ['commons', 'app'],
    }),

    // new BundleAnalyzerPlugin(),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../config'),
      path.resolve(__dirname, '../public'),
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
          use: [
            {
              loader: 'babel-loader',
              // options in .babelrc
            },
          ],
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
  devtool: 'eval',
};
