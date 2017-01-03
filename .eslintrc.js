module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
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
