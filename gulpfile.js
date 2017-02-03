var gulp = require('gulp');
var sass = require('gulp-sass');

var sassOtions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

gulp.task('sass', () => {
	gulp.src('./src/sass/**/*.sass')
		.pipe(sass(sassOtions).on('error', sass.logError))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', () => {
	gulp.watch('./src/sass/**/*.sass', ['sass']);
});