let gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	cleanCss = require('gulp-clean-css');

gulp.task('css', function() {
	gulp.src('./src/style/screen.scss')
		.pipe(sass())
		.on('error', onError)
		.pipe(cleanCss())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./dist/style/'));
	livereload.reload();
});

gulp.task('script', function() {
	gulp.src(['./src/script/app.js'])
	  .pipe(concat('app.js'))
	  .pipe(rename({suffix: '.min'}))
	  .on('error', onError)
	  .pipe(gulp.dest('./dist/script'));
	livereload.reload();
});

function onError(err) {
	console.log(err);
	this.emit('end');
}

gulp.task( 'default', function() {
	gulp.watch( './src/style/*.scss', ['css']);
	gulp.watch( './src/script/*.js', ['script']);
	livereload.listen();
});
