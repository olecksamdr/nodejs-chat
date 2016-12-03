var gulp = require('gulp');
var sass = require('gulp-sass');

var sassOtions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

gulp.task('sass', () => {
	gulp.src('sass/**/*.sass')
		.pipe(sass(sassOtions).on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('default', () => {
	gulp.watch('sass/**/*.sass', ['sass']);
});