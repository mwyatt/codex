require('es6-promise').polyfill(); // required to fix postcss-import?

var settings = require('./gulp/settings');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpConcat = require('gulp-concat');
var tap = require('gulp-tap');
var runSequence = require('run-sequence');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('watch', watch);
gulp.task('min', min);
gulp.task('css', require('./gulp/css'));
gulp.task('cssMin', cssMin);
gulp.task('cssTidy', cssTidy);
gulp.task('js', require('./gulp/js'));
gulp.task('jsLib', jsLib);
gulp.task('jsMin', jsMin);
gulp.task('jsTidy', jsTidy);
gulp.task('mediaTidy', mediaTidy);
gulp.task('copy', copy);

function min() {
  runSequence(
    'cssMin',
    'jsMin'
  );
}

function watch() {
  gulp.watch(settings.watch.css, ['css']);
  gulp.watch(settings.watch.js, ['js']);
}

function cssMin() {
  return gulp.src(settings.assetDest + '**/*.css')
    .pipe(cssmin())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest(settings.assetDest));
}

function cssTidy() {
  return gulp.src(settings.css + '**/*.css')
    .pipe(postcss([postcssCsscomb(postcssCombOptions)]))
    .pipe(tap(function(file) {
      gutil.log('tidy ' + file.path);
    }))
    .pipe(gulp.dest('css'));
}

function jsLib() {
  gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/mustache/mustache.js'
    ])
    .pipe(tap(function(file) {
      gutil.log('concat ' + file.path);
    }))
    .pipe(gulpConcat('lib.js'))
    .pipe(gulp.dest(settings.assetDest));
}

function jsMin() {
  return gulp.src(settings.assetDest + '**.js')
    .pipe(uglify())
    .pipe(tap(function(file) {
      gutil.log('minify ' + file.path);
    }))
    .pipe(gulp.dest(settings.assetDest));
}

function jsTidy() {
  return gulp.src([settings.js + '**/*.js'])
    .pipe(jscs({
      configPath: '.jsTidyGoogle.json',
      fix: true
    }))
    .pipe(gulp.dest('js'));
}

function mediaTidy() {
  return gulp.src(settings.media + '**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(settings.assetDest));
}

function copy() {
  gulp.src(settings.media + '**').pipe(gulp.dest(settings.assetDest));
}
