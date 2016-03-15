var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	strip = require('gulp-strip-comments'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("copyfiles", function() {

	// Copy jQuery
	gulp.src("vendor/bower_components/jquery/dist/jquery.js")
		.pipe(gulp.dest("source/js/"));

	// Copy Materialize
	gulp.src("vendor/bower_components/Materialize/dist/js/materialize.js")
		.pipe(gulp.dest("source/js/"));
	gulp.src("vendor/bower_components/Materialize/sass/**")
		.pipe(gulp.dest("source/sass/materialize"));
	gulp.src("vendor/bower_components/Materialize/dist/font/**")
		.pipe(gulp.dest("public/font/"));

	// Copy MIDI.js
	gulp.src("vendor/bower_components/panarch-midi/build/MIDI.js")
		.pipe(gulp.dest("source/js/midijs"));
	gulp.src("vendor/bower_components/panarch-midi/inc/**")
		.pipe(gulp.dest("source/js/midijs/"))
	gulp.src("vendor/bower_components/panarch-midi/soundfont/**")
		.pipe(gulp.dest("public/soundfont/"));

});

gulp.task('clean', function(cb) {
	del([
		'source/css/**/*',
        'source/js/**/*',
        'source/sass/**/*',
        'public/font',
        'public/soundfont',
        '!source/sass/*.scss',
	], cb);
});

gulp.task('scripts', function() {

	// Merge frontend scripts
	gulp.src([
		'source/js/jquery.js',
		'source/js/materialize.js'
	])
	.pipe(concat('frontend.js'))
	.pipe(gulp.dest('public/js/'));

	gulp.src([
		'source/js/midijs/MIDI.js',
		'source/js/midijs/jasmid/stream.js',
		'source/js/midijs/jasmid/midifile.js',
		'source/js/midijs/jasmid/replayer.js',
		'source/js/midijs/Base64.js',
		'source/js/midijs/base64binary.js'
	])
	.pipe(concat('midi.js'))
	.pipe(gulp.dest('public/js/'));

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
