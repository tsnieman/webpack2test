'use strict';

const path = require('path');
const contextPath = path.resolve(__dirname, '../src')

// Webpack
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  target: "web",

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
      path.resolve(__dirname, '../src/index.jsx'),
		],
	},

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: '[name].bundle.js',
    publicPath: '/', // as it will be served
    chunkFilename: '[name]-[chunkhash].js',
  },

  plugins: [
    // https://github.com/lodash/lodash-webpack-plugin
    new LodashModuleReplacementPlugin,

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

    // Recommended (NoErrorsPlugin is deprecated)
    new webpack.NoEmitOnErrorsPlugin(),

    // Generate HTML to serve
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      inject: 'body',
      favicon: path.join(__dirname, '..', 'src', 'images', 'favicon.ico'),
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

    // Webpack version of https://github.com/nolanlawson/optimize-js
    // which uses some JS engine "hacks" to optimize the execution
    // of some functions. // TODO actually test this lol
    new OptimizeJsPlugin({
      sourceMap: false,
    }),

    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin({
      safeToUseOptionalCaches: true,

      caches: {
        main: [
          'commons.bundle.js',
          'vendor.bundle.js',
          'app.bundle.js',
          ':rest:',
        ],
        additional: [
          ':externals:',
        ],
      },

      externals: [
        '/'
      ],

      ServiceWorker: {
        events: true,
        navigateFallbackURL: '/',
        publicPath: '/sw.js'
      },

      AppCache: {
        events: true,
        publicPath: '/appcache',
        FALLBACK: {
          '/': '/'
        },
      },
    }),
  ],

  resolve: {
    // Where to look for modules (i.e. for importing/requiring)
    modules: [
      "node_modules",
      path.resolve(__dirname, "..", "src"),
      path.resolve(__dirname, "..", "config"),
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

      {
        test: /manifest.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'manifest.json',
            },
          },
          {
            loader: 'web-app-manifest-loader',
          },
        ],
      }
    ],
  },

  // Source maps
  devtool: false,

  // Performance budgets
  // https://medium.com/webpack/webpack-performance-budgets-13d4880fbf6d
  performance: {
    maxAssetSize: 500000, // in bytes (example: 10000 = 10kb)
    maxEntrypointSize: 300000, // in bytes (example: 10000 = 10kb)
    hints: 'warning'
  },
};
