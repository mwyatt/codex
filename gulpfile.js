require('es6-promise').polyfill(); // could be required to fix postcss-import?
var gulp = require('gulp');
var gulpSrc = gulp.src;
var buffer = require('gulp-buffer');
var plumber = require('gulp-plumber');
var tap = require('gulp-tap');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
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
  return gulp.src('*.css')
    .pipe(postcss([postcssCsscomb(postcssCombOptions)]))
    .pipe(gulp.dest('.'));
});

gulp.task('js', function(done) {
  return gulp.src(['**/*.bundle.js', '!asset/*'], {read: false})
    .pipe(tap(function (file) {
      gutil.log('bundling ' + file.path);
      file.contents = browserify(file.path, {debug: true}).bundle();
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('asset'));
});

gulp.task('jsTidy', function () {

  // to google spec
});

gulp.task('jsMin', function () {
  return gulp.src('asset/**.js')
    .pipe(uglify())
    .pipe(gulp.dest('asset'));
});

gulp.task('watch', function () {
  gulp.watch('*.css', ['css']);
});
