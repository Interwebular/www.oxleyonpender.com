var gulp = require("gulp"),
	util = require("gulp-util"),
	sass = require("gulp-sass"),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('default', ['js', 'sass' , 'watch'] , function(){});


gulp.task('js', function(){

	gulp.src('./Resources/Javascripts/app.js')
		.pipe( uglify() )
		.pipe( gulp.dest('./build/js/') );

});

gulp.task('sass',function(){

	gulp.src('./Resources/Stylesheets/app.scss')
		.pipe( sass({ style: 'expanded' }) )
		.pipe( autoprefixer() )
		.pipe( minifycss() )
		.pipe( gulp.dest('./build/css') );
});



gulp.task("watch", function(){

	gulp.watch('./Resources/Javascripts/*.js',   ["js"]);
	gulp.watch('./Resources/Stylesheets/*.scss', ["sass"]);

});