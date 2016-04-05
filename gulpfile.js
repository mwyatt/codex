require('es6-promise').polyfill(); // could be required to fix postcss-import?
var gulp = require('gulp');
var glob = require('glob');
var gulpSrc = gulp.src;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssSimpleVars = require('postcss-simple-vars');
var postcssCsscomb = require('postcss-csscomb');
var postcssColorFunction = require('postcss-color-function');
var postcssHexrgba = require('postcss-hexrgba');
var postcssConditionals = require('postcss-conditionals');
var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var processes = [
  postcssImport,
  postcssSimpleVars,
  postcssConditionals,
  postcssHexrgba(),
  postcssColorFunction(),
  autoprefixer({browsers: ['last 1 version']})
];
var postcssOptions = {
  "remove-empty-rulesets": true,
  "always-semicolon": true,
  "color-case": "lower",
  "block-indent": "  ",
  "color-shorthand": false,
  "element-case": "lower",
  "eof-newline": true,
  "leading-zero": true,
  "quotes": "single",
  "sort-order-fallback": "abc",
  "space-before-colon": "",
  "space-after-colon": " ",
  "space-before-combinator": " ",
  "space-after-combinator": " ",
  "space-between-declarations": "\n",
  "space-before-opening-brace": " ",
  "space-after-opening-brace": "\n",
  "space-after-selector-delimiter": "\n",
  "space-before-selector-delimiter": "",
  "space-before-closing-brace": "\n",
  "strip-spaces": true,
  "tab-size": 1,
  "unitless-zero": true,
  "vendor-prefix-align": true
};
 
// gulp.src = function() {
//   return gulpSrc.apply(gulp, arguments)
//     .pipe(plumber(function(error) {
//       // Output an error message
//       gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
//       // emit the end event, to properly end the task
//       this.emit('end');
//     })
//   );
// };

gulp.task('css', function () {
  return gulp.src('common.css')
    .pipe(postcss(processes))
    .pipe(gulp.dest('asset'));
});

gulp.task('cssTidy', function () {
  glob('*.css', function(err, files) {
    var tasks = files.map(function(entry) {
      return gulp.src(entry)
        .pipe(postcss([postcssCsscomb(postcssOptions)]))
        .pipe(gulp.dest('.'));
    });
    es.merge(tasks).on('end', done);
  });
});

gulp.task('js', function(done) {
  return browserify({paths: '.'})
    .add('common.js')
    .bundle()
    .pipe(source('common.js'))
    .pipe(gulp.dest('asset'));
});

gulp.task('watch', function () {
  gulp.watch('*.css', ['css']);
});
