require('es6-promise').polyfill(); // could be required to fix postcss-import?
var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
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
  return gulp.src('css/**/*.bundle.css')
    .pipe(postcss(postcssProcesses))
    .pipe(tap(function(file) {
      gutil.log('build ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('cssMin', function () {
  return gulp.src('asset/**/*.css')
    .pipe(cssmin())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('cssTidy', function() {
  return gulp.src('css/**/*.css')
    .pipe(postcss([postcssCsscomb(postcssCombOptions)]))
    .pipe(tap(function(file) {
      gutil.log('tidy ' + file.path);
    }))
    .pipe(gulp.dest(''));
});

gulp.task('js', function() {
  return gulp.src('js/**/*.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: true}).bundle();
      gutil.log(file.contents);
      gutil.log('build ' + file.path);
    }))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('asset'));
});

gulp.task('jsLib', function() {
  gulp.src([
      'node_modules/jquery/dist/jquery.js'
    ])
    .pipe(tap(function(file) {
      gutil.log('concat ' + file.path);
    }))
    .pipe(gulpConcat('lib.js'))
    .pipe(gulp.dest('asset'));
});

gulp.task('jsMin', function () {
  return gulp.src('asset/**.js')
    .pipe(uglify())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('jsTidy', function () {

  // to google spec
});

gulp.task('watch', function () {
  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});
