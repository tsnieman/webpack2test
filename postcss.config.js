module.exports = {
  plugins: [
    require('postcss-color-function')(),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ]
}
