var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	strip = require('gulp-strip-comments'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("copyfiles", function() {

	// Files from vendor/bower_components, where you need them

});

gulp.task('clean', function(cb) {
	del([
		'source/css/**/*',
        'source/js/**/*',
        'source/sass/**/*',
        '!source/sass/*.scss',
	], cb);
});

gulp.task('scripts', function() {

	// Merge scripts here

});

gulp.task('sass', function() {
	gulp.src('source/sass/style.scss')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer("last 10 versions"))
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css'));
});

gulp.task('css', function() {

	// Run css concat or minify here

});

gulp.task('watch', function() {
	gulp.watch([
		'source/sass/style.scss',
		'source/sass/responsive.scss'
	], ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'css']);
