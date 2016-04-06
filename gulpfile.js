require('es6-promise').polyfill(); // could be required to fix postcss-import?

var isLocal = true;

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConcat = require('gulp-concat');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var runSequence = require('run-sequence');

var browserify = require('browserify');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');

var cssmin = require('gulp-cssmin');
var autoprefixer = require('autoprefixer');

var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssCsscomb = require('postcss-csscomb');
var postcssCombOptions = require('./.csscomb.json');
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

gulp.task('watch', function() {
  gulp.watch('css/**/*.css', ['css']);
  gulp.watch('js/**/*.js', ['js']);
});

gulp.task('min', function() {
  runSequence(
    'cssMin',
    'jsMin'
  );
});
 
gulp.task('css', function() {
  return gulp.src('css/**/*.bundle.css')
    .pipe(postcss(postcssProcesses))
    .pipe(tap(function(file) {
      gutil.log('build ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('cssMin', function() {
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
    .pipe(gulp.dest('css'));
});

gulp.task('js', function() {
  return gulp.src('js/**/*.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: isLocal})
        .transform('browserify-shim', {global: true})
        .bundle();
      gutil.log('build ' + file.path);
    }))
    .pipe(buffer())
    .pipe(gulp.dest('asset'));
});

gulp.task('jsLib', function() {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/mustache/mustache.js'
    ])
    .pipe(tap(function(file) {
      gutil.log('concat ' + file.path);
    }))
    .pipe(gulpConcat('lib.js'))
    .pipe(gulp.dest('asset'));
});

gulp.task('jsMin', function() {
  return gulp.src('asset/**.js')
    .pipe(uglify())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('jsTidy', function() {
  return gulp.src(['js/**', '!js/vendor/**', '!js/admin/vendor/**'])
    .pipe(jscs({
      configPath: '.jsTidyGoogle.json',
      fix: true
    }))
    .pipe(gulp.dest('js'));
});
