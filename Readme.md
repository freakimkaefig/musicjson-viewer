# HTML Starterkit with Bower and Gulp
This starterkit was developed for easy setting up small test environments with Bower and Gulp. I use this kit when trying new stuff in the JS-world or testing out random APIs.

## Install dependencies

Dev dependencies are:
- gulp
- gulp-rename
- gulp-strip-comments

Run `npm install` in root directory. After this you'll get a new directory `./node_modules` where all npm modules are installed.

To init Bower run `bower init` and follow the steps on your command line.

## Install other dependencies
Run `bower install --save <dependency>`

e.g. `bower install --save bootstrap` to install Twitter Bootstap.

The dependencies are downloaded into `./vendor/bower_components`

To use dependencies in your webroot (`./public`) use Gulp

## Gulp

Dependencies are prepared in gulpfile.js

e.g. if you installed Twitter Bootstrap via Bower you'll need to copy the JS files into webroot and also compile LESS files and move the resulting CSS to production. This all is done via Gulp.

### Copfiles
First we'll merge dependencies for different parts of your UI (e.g. if every UI uses Bootstrap and Angular, you can merge both to a single file). Therefor you have to copy your files to the `./source/js` directory.

Modify the task `copyfiles` in your gulpfile:
```javascript
gulp.task("copyfiles", function() {

	// Copy jQuery
	gulp.src("vendor/bower_components/jquery/dist/jquery.js")
		.pipe(gulp.dest("source/js/"));

	// Copy Bootstrap
	gulp.src("vendor/bower_components/bootstrap/less/**")
		.pipe(gulp.dest("source/less/bootstrap"));
	gulp.src("vendor/bower_components/bootstrap/dist/js/bootstrap.js")
		.pipe(gulp.dest("source/js/"));
	gulp.src("vendor/bower_components/bootstrap/dist/fonts/**")
		.pipe(gulp.dest("public/fonts"));

});
```
You'll end up with the copied files in `./source`.

### Clean
At this step we also want to provide the `clean` task in gulpfile. When we look into our gulpfile, there are already some paths configured:
```javascript
gulp.task('clean', function(cb) {
	del([
		'source/css/**/*',
		'source/js/**/*',
		'source/less/**/*',
		'!source/less/*.less'
	], cb);
});
```
This will clear all css, js and less files from the `./source` directory except the less files directly in `./source/less`. This is for your own less files, that include dependencies like bootstrap. We'll come to that later.

### Scripts
Next we'll merge the JS files, so we'll update the task `scripts`:
```javascript
gulp.task('scripts', function() {
	// App
	gulp.src([
		'source/js/jquery.js',
		'source/js/bootstrap.js'
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('public/js'));
});
```
This'll create a file app.js in `./public/js/` which contains merged contents of jQuery and Bootstrap.

### Less
Next up is the LESS Compiler. We'll also solve this with Gulp in the designated task `less`. But first we have to import bootstrap in our `style.less`:
```less
/*========================================================
================== IMPORT DEPENDENCIES ===================
========================================================*/

@import "bootstrap/bootstrap.less";

/*========================================================
==================== CUSTOM VARIABLES ====================
========================================================*/

@body-bg: #000;
@text-color: #fff;

/*========================================================
====================== CUSTOM STYLES =====================
========================================================*/

h1 {
	color: #f00;
}

/*========================================================
================ IMPORT RESPONSIVE STYLES ================
========================================================*/

@import "responsive.less";
```
First we added bootstrap with `@import`, then overwrote some bootstrap variables. To compile this less file we have a look in our Gulpfile:
```javascript
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
```
The predefined gulpfile in this starterkit also includes sourcemaps and autoprefix so we'll also use them in the less compilation above. The main starting file for less compilation in this starterkit is `./soure/less/style.less`. To ensure working less compilation add your dependencies here and also import other custom less files here.

To use the auto compile function, when your less changes, we'll have a look into your gulpfile:
```javascript
gulp.task('watch', function() {
	gulp.watch([
		'source/less/style.less',
		'source/less/responsive.less'
	], ['less']);
});
```
This will watch the files `style.less` and `responsive.less` for changes. You can start the watch task with `gulp watch`.

The file `responsive.less` in `./source/less/` is designated to hold your responsive styles and different media queries. For better flexibility the file isn't prefilled with any media queries, but you can add them, e.g. for bootstrap like following:
```less
/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) {
	body {
		color: #0f0;
	}
}

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) {

}

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) {

}

/* Only Mobile */
@media (max-width: @screen-xs-max) {

}

/* Only Desktop */
@media (max-width: @screen-md-max) {

}

/* Only Tablet */
@media (max-width: @screen-sm-max) {

}

/* Only mobile */
@media (max-width: @screen-xs-max) {

}
```

### Html
Our main index file is in `./public/index.html`. It inherits a basic HTML structure. We'll have to include our scripts and stylesheets here:
```html
<!DOCTYPE html>
<html>
	<head>
		<title>Bower-Gulp-Starterkit</title>
		<meta charset="utf-8"/>

		<!-- Stylesheets -->
		<link rel="stylesheet" type="text/css" href="css/style.css"/>

		<!-- Scripts -->
		<script type="text/javascript" src="js/app.js"></script>

		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
	</head>
	<body>
		...
	</body>
</html>
```

## License
This project is licensed under the MIT License (MIT). For more information have a look at License.md.

Feel free to use this starterkit as basis to your projects.