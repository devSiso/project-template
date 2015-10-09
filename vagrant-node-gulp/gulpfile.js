/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify'),
		livereload = require('gulp-livereload'),
		minifycss = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		babel = require('gulp-babel'),
		gutil = require('gulp-util');

// define the default task and add the watch task to it
gulp.task('default', ['build-css' , 'build-js' , 'copy' , 'watch']);

// style
gulp.task('build-css', function() {
  return sass('app/assets/scss/bundle.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Build CSS' }));
});

// js
gulp.task('build-js', function() {
  return gulp.src('app/assets/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Build JS' }));
});

// copy public files
gulp.task('copy', function() {
  gulp.src('app/public/**/*.*')
    .pipe(gulp.dest('dist'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('app/assets/scss/**/*.scss', ['build-css']);
  gulp.watch('app/assets/js/**/*.js', ['build-js']);
  gulp.watch('app/public/**/*.*', ['copy']);
});