/* eslint-disable global-require */

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');

var plugins = gulpLoadPlugins();

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(plugins.clean());
});

gulp.task('manifest', function () {
  var pkg = require('./package.json');

  return gulp.src('src/manifest.json')
    .pipe(plugins.chromeManifest({
      background: {
        target: 'js/background.js'
      },
      buildnumber: pkg.version
    }))
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(gulp.dest('build'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(plugins.useref({searchPath: ['src']}))
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(plugins.if('*.html', plugins.htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      minifyCSS: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true
    })))
    .pipe(gulp.dest('build'));
});

gulp.task('package', function () {
  var manifest = require('./build/manifest.json');

  return gulp.src('build/**')
    .pipe(plugins.zip('pinboard-pro-' + manifest.version + '.zip'))
    .pipe(gulp.dest('build'));
});

gulp.task('static', function () {
  return gulp.src([
    'src/{images,fonts}/*.*'
  ], {
    dot: true
  }).pipe(gulp.dest('build'));
});

gulp.task('build', function (cb) {
  runSequence(
    'manifest',
    ['html', 'static'],
    cb
  );
});

gulp.task('default', ['clean'], function (cb) {
  runSequence('build', cb);
});
