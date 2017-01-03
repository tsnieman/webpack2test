module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/external-module-folders": [
      "node_modules",
      "src",
      "config",
    ],
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.js",
      }
    }
  },
  "globals": {
    "test": true, // TODO only in *.test.* files?
    "expect": true, // TODO only in *.test.* files?
    "document": true,
  },
};
