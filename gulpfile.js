var gulp = require('gulp')
var gutil = require('gulp-util')
var tap = require('gulp-tap')
var runSequence = require('run-sequence')

var stringify = require('stringify')
var browserify = require('browserify')
var buffer = require('gulp-buffer')

var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
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

gulp.task('default', function() {
  runSequence(['css', 'js'])
})

gulp.task('js', function() {
  return gulp.src('**.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: true})
        .transform(stringify, {
          global: true,
          appliesTo: {includeExtensions: ['.mst']},
          minify: true
        })
        // .transform('browserify-shim', {global: true})
        .bundle()
      gutil.log('build ' + file.path)
    }))
    .pipe(buffer())
    .pipe(gulp.dest('asset'))
})

gulp.task('css', function() {
  return gulp.src('**.bundle.css')
    .pipe(postcss(postcssProcesses))
    .pipe(tap(function(file) {
      gutil.log('build ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
})

gulp.task('copy', function() {
  // gulp.src('media/**').pipe(gulp.dest('asset'));
})