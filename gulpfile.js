require('es6-promise').polyfill(); // could be required to fix postcss-import?
var gulp = require('gulp');
var gulpSrc = gulp.src;
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssCsscomb = require('postcss-csscomb');
var postcssCombOptions = {
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
var postcssColorFunction = require('postcss-color-function');
var postcssHexrgba = require('postcss-hexrgba');
var postcssConditionals = require('postcss-conditionals');
var postcssCustomProperties = require('postcss-custom-properties');
var postcssProcesses = [
  postcssImport,
  postcssCustomProperties(),
  postcssConditionals,
  postcssHexrgba(),
  postcssColorFunction(),
  autoprefixer({browsers: ['last 1 version']})
];
 
gulp.task('css', function () {
  return gulp.src('common.css')
    .pipe(postcss(postcssProcesses))
    .pipe(gulp.dest('asset'));
});

gulp.task('cssMin', function () {
  return gulp.src('asset/**.css')
    .pipe(cssmin())
    .pipe(gulp.dest('asset'));
});

gulp.task('cssTidy', function(done) {
  return gulp.src(['*.css'])
    .pipe(postcss([postcssCsscomb(postcssCombOptions)]))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function(done) {
  return browserify({paths: '.'})
    .add('common.js')
    .bundle()
    .pipe(source('common.js'))
    .pipe(gulp.dest('asset'));
});

gulp.task('jsMin', function () {
  return gulp.src('asset/**.js')
    .pipe(uglify())
    .pipe(gulp.dest('asset'));
});

gulp.task('watch', function () {
  gulp.watch('*.css', ['css']);
});


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