var pkg = require('./package.json');
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var csscomb = require('gulp-csscomb');
var postcss = require('gulp-postcss');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var csswring = require('csswring');
var source = require('vinyl-source-stream');
var eventStream = require('event-stream');
var glob = require('glob');
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var processes = [
  require('postcss-import'),
  require('postcss-mixins'),
  require('postcss-simple-vars'),
  colorFunction(),
  autoprefixer({browsers: ['last 1 version']})
];

gulp.task('copy-media', function() {
  return gulp.src('media/**')
    .pipe(gulp.dest('asset'));
});

gulp.task('copy-js-vendor', function() {
  return gulp.src('jsVendor/**')
    .pipe(gulp.dest('asset'));
});

gulp.task('css', function () {
  return gulp.src('**.bundle.css')
    .pipe(postcss(processes))
    .pipe(rename(function (pathObject) {
      pathObject.basename = pathObject.basename.replace('.bundle', '');
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('css-tidy', function() {
  return gulp.src('./css')
    .pipe(csscomb())
    .pipe(gulp.dest('./css'));
});

gulp.task('css-min', function () {
  processes.push(csswring);
  return gulp.src('**.bundle.css')
    .pipe(postcss(processes))
    .pipe(rename(function (pathObject) {
      pathObject.basename = pathObject.basename.replace('.bundle', '');
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('js', function(done) {
  glob('**.bundle.js', function(err, files) {
    if (err) {
      done(err);
    };
    var tasks = files.map(function(entry) {
      return browserify({
        entries: [entry],
        paths: [
          '.',
          'node_modules'
        ]
      })
      .bundle()
      .pipe(source(entry.replace('js/', '').replace('.bundle', '')))
      .pipe(gulp.dest('asset'));
    });

    // create a merged stream
    eventStream.merge(tasks).on('end', done);
  });
});

gulp.task('js-tidy', function () {
  return gulp.src('js/common.bundle.js')
    .pipe(jscs({
      'preset': 'google'
    }));
});

gulp.task('js-min', function() {
  gulp.src('asset/**.js')
    .pipe(uglify())
    .pipe(gulp.dest('asset'));
});

gulp.task('image-min', function () {
  return gulp.src('media/**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('media'));
});
