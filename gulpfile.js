const gulp = require("gulp"),
	sass = require("gulp-sass"),
	watch = require("gulp-watch"),
	del = require("del"),
	connect = require("gulp-connect"),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require("gulp-sourcemaps"),
	cleanCSS = require("gulp-clean-css"),
	concat = require('gulp-concat');
	
const CONFIGS = {
	"src": "assets",
	"srcJs": "assets/js",
	"srcScss": "assets/scss",
	"srcImg": "assets/img",
	"srcImage": "assets/images",
	"srcFont": "assets/fonts",
	"dest": "public",
	"destJs": "public/js",
	"destCss": "public/css",
	"destImg": "public/img",
	"destImage": "public/images",
	"destFont": "public/fonts",
	"mapSrc": "map"
};

var IMPORT_CONFIGS = {
	"bootstrapDir": "node_modules/bootstrap/dist",
	"fontAwesomeDir": "node_modules/font-awesome-scss",
	"jqueryDir": "node_modules/jquery/dist"
};

// create server
gulp.task('connect', function () {
	connect.server({
		root: '.',
		port: 6996,
		livereload: true
	});
});

// clean js file before building
gulp.task('clean-js', function () {
	return del([CONFIGS.destJs]);
});

// clean images before building
gulp.task('clean-img', function () {
	return del([CONFIGS.destImg]);
});

gulp.task('clean-image', function () {
	return del([CONFIGS.destImage]);
});

// build sass
gulp.task('sass', function () {
	return gulp.src([
		IMPORT_CONFIGS.bootstrapDir + "/css/bootstrap.css",
		CONFIGS.srcScss + '/**/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write([CONFIGS.mapSrc]))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(CONFIGS.destCss))
		.pipe(connect.reload());
});

// build js
gulp.task('js', ['clean-js'], function () {
	return gulp.src(CONFIGS.srcJs + "/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write([CONFIGS.mapSrc]))
		.pipe(gulp.dest(CONFIGS.destJs))
		.pipe(connect.reload());
});

gulp.task('copy-img', function () {
	return gulp.src([CONFIGS.srcImg + "/*.*"])
		.pipe(gulp.dest(CONFIGS.destImg));
});

gulp.task('copy-jquery', function () {
	return gulp.src([
		IMPORT_CONFIGS.jqueryDir + "/jquery.min.js",
		IMPORT_CONFIGS.bootstrapDir + "/js/bootstrap.min.js"
	])
		.pipe(gulp.dest(CONFIGS.destJs));
});

gulp.task('copy-bootstrap-jquery', function () {
	return gulp.src([
		IMPORT_CONFIGS.bootstrapDir + "/js/bootstrap.min.js"
	])
		.pipe(gulp.dest(CONFIGS.destJs));
});

gulp.task('copy-fonts', function () {
	return gulp.src([IMPORT_CONFIGS.fontAwesomeDir + "/fonts/*.{eot,svg,ttf,woff,woff2}"])
        .pipe(gulp.dest(CONFIGS.destFont));
});

gulp.task('html', function () {
	return gulp.src(['./*.html'])
		.pipe(connect.reload());
});


gulp.task('default', ['connect', 'sass', 'js', 'copy-fonts', 'copy-jquery', 'copy-bootstrap-jquery', 'copy-img'], function () {
	let watchScssSrc = CONFIGS.srcScss + "/**/*.scss";
	let watchJsSrc = CONFIGS.srcJs + "/**/*.js";

	gulp.watch(['**/*.html'], ['html']);
	gulp.watch(watchScssSrc, ['sass']);
	gulp.watch(watchJsSrc, ['js']);
});