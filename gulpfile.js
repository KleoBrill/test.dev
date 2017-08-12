const gulp = require('gulp'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	merge = require('merge-stream'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('views', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
	gulp.src('./src/images/**/**')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
	gulp.src('./src/fonts/**/**')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('less', function() {
	gulp.src(['./src/css/**/**.css', './src/css/**/**.less'])
		.pipe(less({
			includePaths: [],
			errLogToConsole: true,
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src([
			'./src/js/jquery.js',
			'./src/js/jquery.bxslider.js',
			'./src/js/**/**.js'
		])
		.pipe(concat('app.js'))
		.pipe(uglify().on('error', function(e) {
			console.log(e);
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	return connect.server({
		port: 8880,
		root: 'dist',
		livereload: true
	});
})

gulp.task('reload', function() {
	return gulp.src('./*')
		.pipe(connect.reload());
})

gulp.task('watch', function() {
	gulp.watch(['./src/js/**/**'], ['js']);
	gulp.watch(['./src/css/**/**'], ['less']);
	gulp.watch(['./src/index.html'], ['views']);
});

gulp.task('build', ['views', 'images', 'fonts', 'js', 'less']);
gulp.task('default', ['build', 'watch', 'connect']);