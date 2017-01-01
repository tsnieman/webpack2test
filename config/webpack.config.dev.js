'use strict';

const path = require("path");
const webpack = require("webpack");

module.exports = {
  // The 'base folder' for the app
  context: path.resolve(__dirname, "..", "src"),

  // The entry point for different bundles
  // i.e. where the app "begins"/inits.
  entry: {
    app: "./app.js",
  },

  // The bundle outputs
  output: {
    path: path.resolve(__dirname, "..", "built"),
    filename: "[name].bundle.js",
  },
};
