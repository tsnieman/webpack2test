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
  "rules": {
    "jsx-a11y/no-marquee": 0, // for some reason am getting "Definition for rule 'jsx-a11y/no-marquee' was not found  jsx-a11y/no-marquee"
  }
};
