# Codex
A refreshing start for your css.
### Features
- [normalize.css](https://www.npmjs.com/package/normalize.css)
- [postcss](https://www.npmjs.com/package/postcss)
- Native var(--variable-name) syntax

### Installation
```sh
npm install --save-dev mwyatt-codex autoprefixer gulp gulp-postcss postcss-color-function postcss-conditionals postcss-custom-properties postcss-hexrgba postcss-import
```
### Usage
Within your *.bundle.css file:
```javascript
@import 'mwyatt-codex';
```
Importing any additional Codex resources:
```javascript
@import 'mwyatt-codex/css/file-name';
```
### Gulp Task
Your gulp build task should look something like this:
```javascript
gulp.task('task-name', function() {
  return gulp.src('css/*.bundle.css')
    .pipe(postcss([
      postcssImport,
      postcssCustomProperties(),
      postcssConditionals,
      postcssHexrgba(),
      postcssColorFunction(),
      autoprefixer({browsers: ['last 1 version']})
    ]))
    .pipe(gulp.dest('asset'));
});
``` 
