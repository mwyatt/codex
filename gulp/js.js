var settings = require('./settings');
var gulp = require('gulp');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var browserify = require('browserify');
var buffer = require('gulp-buffer');

module.exports = function() {
  return gulp.src(settings.js + '**/*.bundle.js', {read: false})
    .pipe(tap(function(file) {
      file.contents = browserify(file.path, {debug: settings.isLocal})
        .transform('browserify-shim', {global: true})
        .bundle();
      gutil.log('build ' + file.path);
    }))
    .pipe(buffer())
    .pipe(gulp.dest(settings.assetDest));
};
