var pkg = require('./package.json');
var gulp = require('gulp');
var gulpPlugin = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var eventStream = require('event-stream');
var glob = require('glob');
var autoprefixer = require('gulp-autoprefixer');
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
  return gulp.src('js/vendor/**')
    .pipe(gulp.dest('asset'));
});

gulp.task('css', function () {
  return gulp.src('css/**.bundle.css')
    .pipe(gulpPlugin.postcss(processes))
    .pipe(gulpPlugin.rename(function (pathObject) {
      pathObject.basename = pathObject.basename.replace('.bundle', '');
    }))
    .pipe(gulp.dest('asset'));
});

gulp.task('css-tidy', function() {
  return gulp.src('./css')
    .pipe(gulpPlugin.csscomb())
    .pipe(gulp.dest('./css'));
});

gulp.task('css-min', function () {
  processes.push(require('csswring'));
  return gulp.src('css/**.bundle.css')
    .pipe(gulpPlugin.postcss(processes))
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
    .pipe(gulpPlugin.jscs({
      'preset': 'google'
    }));
});

gulp.task('js-min', function() {
  gulp.src('asset/**.js')
    .pipe(gulpPlugin.uglify())
    .pipe(gulp.dest('asset'));
});
