module.exports = {
  plugins: [
    require('postcss-nested')(),
    require('postcss-import')({
      path: [
        './src'
      ],
    }),
    require('postcss-custom-properties')(),
    require('postcss-color-function')(),
    require('autoprefixer')({ browsers: ['last 2 versions'] }),
  ]
}
