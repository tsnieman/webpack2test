// Use DefinePlugin (Webpack) together with Uglify
// to strip the dev branch in prod build.
if (process.env.NODE_ENV === 'production') {
  // TODO
  module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.dev'); // eslint-disable-line global-require
}
