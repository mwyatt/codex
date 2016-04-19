# Codex - Lightweight reusable CSS
Codex is a refreshing start for your css. Some advantages to using Codex are:
- Uses postcss
- Takes advantage of the native var(--variable-name) syntax
### Installation
```sh
npm install --save-dev mwyatt-codex
```
### Usage
Default usage is simple:
```sh
@import 'mwyatt-codex';
```
Importing any additional files is done like this:
```sh
@import 'mwyatt-codex/css/file-name';
```
Your gulp build task should look something like this:
```sh
  return gulp.src(settings.css + '**/*.bundle.css')
    .pipe(postcss(postcssProcesses))
    .pipe(tap(function(file) {
      gutil.log('build ' + file.path);
    }))
    .pipe(gulp.dest(settings.assetDest));
```

### Dependencies
Codex requires the following dependencies to build correctly:
- gulp
- gulp-postcss
- postcss-color-function
- postcss-conditionals
- postcss-custom-properties
- postcss-hexrgba
- postcss-import
