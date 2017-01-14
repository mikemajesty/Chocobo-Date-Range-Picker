var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('js', function () {
	return gulp.src('chocobo-range-picker.js')
    .pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify({ mangle: false }))
		.pipe(concat('chocobo-range-picker.min.js'))
		.pipe(gulp.dest('dist/js/'));
});
