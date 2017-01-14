var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('js', function () {
	return gulp.src('bootTimePicker.js')
    .pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify({ mangle: false }))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js/'));
});
