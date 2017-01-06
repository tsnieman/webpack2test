module.exports = {
  plugins: [
    /* TODO use custom css modules scoped name (i.e. generated class name) ...
    * currently the problem is getting babel-plugin-react-css-modules to
    * also be this same scoped name */
    /*
    require('postcss-modules')({
      generateScopedName: function(name, filename, css) {
        var path  = require('path');
        var i     = css.indexOf('.' + name);
        var line  = css.substr(0, i).split(/[\r\n]/).length;
        var file  = path.basename(filename, '.css');

        return '_' + file + '_' + line + '_' + name;
      }
    }),
    */
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
