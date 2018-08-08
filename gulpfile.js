const gulp = require("gulp"),
	sass = require("gulp-sass"),
	watch = require("gulp-watch"),
	del = require("del"),
	connect = require("gulp-connect"),
	autoprefixer = require("gulp-autoprefixer"),
	sourcemaps = require("gulp-sourcemaps");
	
var CONFIGS = {
	"src": "assets",
	"srcJs": "assets/js",
	"srcScss": "assets/scss",
	"srcImg": "assets/img",
	"srcImage": "assets/images",
	"dest": "public",
	"destJs": "public/js",
	"destCss": "public/css",
	"destImg": "public/img",
	"destImage": "public/images",
	"mapSrc": "map"
};

// create server
gulp.task('connect', function () {
	connect.server({
		name: 'CAFE - BITCOIN',
		root: '',
		port: 6996,
		livereload: true
	});
});

// clean css file before building
gulp.task('clean-sass', function () {
	return del([CONFIGS.destCss]);
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
gulp.task('sass', ['clean-sass'], function () {
	return gulp.src(CONFIGS.srcScss + '/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(sourcemaps.write([CONFIGS.mapSrc]))
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


gulp.task('default', ['connect', 'sass', 'js'], function () {
	let watchScssSrc = CONFIGS.srcScss + "/**/*.scss";
	let watchJsSrc = CONFIGS.srcJs + "/**/*.js";

	gulp.watch(watchScssSrc, ['sass']);
	gulp.watch(watchJsSrc, ['js']);
});