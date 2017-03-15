// grab our gulp packages
var gulp  = require('gulp'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		notify = require('gulp-notify'),
		minifycss = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		connect = require('gulp-connect'),
		gutil = require('gulp-util'),
		watch = require('gulp-watch'),
		batch = require('gulp-batch'),
		fileinclude = require('gulp-file-include'),
		spritesmith = require("gulp.spritesmith"),
		buffer = require('vinyl-buffer'),
		csso = require('gulp-csso'),
		imagemin = require('gulp-imagemin'),
		merge = require('merge-stream'),
		runSequence = require('run-sequence'),
		cors = require('cors'),
		portfinder = require('portfinder');

var paths = {
	src: {
		less: './src/assets/less/main.less',
		js: [
			'./src/assets/js/libs/*.js',
			'./src/assets/js/components/*.js',
			'./src/assets/js/*.js'
		],
		copy: ['./src/public/**/*.*', '!./src/public/**/*.html'],
		copyImg: ['./src/assets/img/**/*.*'],
		replace: {
			src: ['./src/public/**/*.html'],
			base: './src/views/',
			dest: './dist/'
		},
		sprite: {
			src: './src/assets/sprite/**/*.png',
			name: 'sprite'
		}
	},
	watch: {
		less: './src/assets/less/**/*.less',
		js: './src/assets/js/**/*.js',
		copy: './src/public/**/*.*',
		replace: {
			public: './src/public/**/*.html',
			view: './src/views/**/*.html',
		},
		sprite: './src/assets/sprite/**/*.*'
	}
};

// define the default task and add the watch task to it
gulp.task('dev', ['build-css', 'build-js', 'copy' , 'replace' , 'sprites' , 'connect' , 'watch']);
gulp.task('build', ['build-min-css' , 'build-min-js' , 'copy' ,  'sprites' , 'replace']);

// style
gulp.task('build-css', function() {
	return gulp.src(paths.src.less)
		.pipe(less())
		.pipe(autoprefixer('last 10 version'))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({ message: 'Build CSS' }))
		.pipe(connect.reload());
});
gulp.task('build-min-css', function() {
	return gulp.src(paths.src.less)
		.pipe(less())
		.pipe(autoprefixer('last 10 version'))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({ message: 'Build CSS' }));
});

// js
gulp.task('build-js', function() {
	return gulp.src(paths.src.js)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({ message: 'Build JS' }))
		.pipe(connect.reload());
});
gulp.task('build-min-js', function() {
	return gulp.src(paths.src.js)
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({ message: 'Build JS' }));
});

// copy public files
gulp.task('copy', function() {
	return gulp.src(paths.src.copy)
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

// copy image files
gulp.task('copyImg', function() {
	return gulp.src(paths.src.copyImg)
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img')).pipe(notify({ message: 'Build Image' }))
		.pipe(connect.reload());
});

// sprite
gulp.task('sprites', function () {
	var spriteData = gulp.src(paths.src.sprite.src).pipe(spritesmith({
    imgName: paths.src.sprite.name + '.png',
    cssName: paths.src.sprite.name + '.css',
		cssOpts: {
	    cssSelector: function (item) {
	      return '.' + item.name;
	    }
	  }
  }));

	var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('dist/css')).pipe(notify({ message: 'Build Sprite Image' }))
    .pipe(connect.reload());

	var cssStream = spriteData.css
    .pipe(csso())
    .pipe(gulp.dest('dist/css')).pipe(notify({ message: 'Build Sprite CSS' }))
    .pipe(connect.reload());

  return merge(imgStream, cssStream);
});

// replace
gulp.task('replace', function() {
	return gulp.src(paths.src.replace.src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: paths.src.replace.base
    }))
    .pipe(gulp.dest(paths.src.replace.dest))
		.pipe(notify({ message: 'Build Include Replace' }))
		.pipe(connect.reload());
});

// server
gulp.task('connect', function() {
	portfinder.getPort(function (err, port) {
		connect.server({
	  	port: port,
	    root: 'dist',
	    middleware: function(connect, opt) {
	      return [cors()];
	    },
      livereload: true
	  });
  });
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	watch(paths.watch.less, batch(function (events, done) {
    return gulp.start('build-css', done);
  }));
	watch(paths.watch.js, batch(function (events, done) {
    return gulp.start('build-js', done);
  }));
	watch(paths.watch.copy, batch(function (events, done) {
    return gulp.start('copy', done);
  }));
	watch(paths.watch.replace.view, batch(function (events, done) {
    return gulp.start('replace', done);
  }));
	watch(paths.watch.replace.public, batch(function (events, done) {
    return gulp.start('replace', done);
  }));
	watch(paths.watch.sprite, batch(function (events, done) {
    return gulp.start('sprites', done);
  }));
});
