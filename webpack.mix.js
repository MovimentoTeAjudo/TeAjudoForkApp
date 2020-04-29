const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/js/app.js', 'js')
    .sass('src/sass/app.scss', 'css')
    .copyDirectory('src/images', 'images')
    .copyDirectory('src/fonts', 'fonts')
    .copyDirectory('src/index.html', 'index.html');

 mix.browserSync();

let src_path = 'src/js/';

mix.webpackConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, src_path),
      '@store': path.resolve(__dirname, src_path + 'store/'),
      '@views': path.resolve(__dirname, src_path + 'views/'),
      '@components': path.resolve(__dirname, src_path + 'components/'),
      '@modules': path.resolve(__dirname, src_path + 'modules/'),
    }
  },
  node: {
     fs: "empty"
  }
});
