/**
 * @file
 * Provides Gulp configurations and tasks for Bootstrap for Drupal theme.
 */

'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');


// CSS task
function sass2css() {
  return gulp
    .src('./assets/scss/global.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
}

// Watch files
function watchFiles() {
  browserSync.init({
    open: 'external',
    host: 'theme-bfd5-base.site',
    server: {
      baseDir: './',
    }
  });

  gulp
    .watch("./assets/scss/**/*.scss", sass2css)
    .on('change', browserSync.reload);
}

const watch = gulp.series(watchFiles);

// export tasks

exports.default = watch;