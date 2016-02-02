var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	less = require('gulp-less'),
	rename = require('gulp-rename'),
	strip = require('gulp-strip-comments'),
	sourcemaps = require('gulp-sourcemaps');

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
	autoprefix = new LessPluginAutoPrefix({browsers: ['last 10 versions'], remove: false});

gulp.task("copyfiles", function() {

	// Files from vendor/bower_components, where you need them

});

gulp.task('clean', function(cb) {
	del([
		'source/css/**/*',
        'source/js/**/*',
        'source/less/**/*',
        '!source/less/*.less'
	], cb);
});

gulp.task('scripts', function() {

	// Merge scripts here

});

gulp.task('less', function() {
	gulp.src('source/less/style.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			paths: ['source/less'],
			plugins: [autoprefix]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/css'));
});

gulp.task('css', function() {

	// Run css concat or minify here

});

gulp.task('watch', function() {
	gulp.watch([
		'source/less/style.less',
		'source/less/responsive.less'
	], ['less']);
});

gulp.task('default', ['scripts', 'less', 'css']);
