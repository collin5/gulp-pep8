const gulpPep8 = require('../lib')
const gulp = require('gulp');

gulp.task('lint', () => {
  return gulp.src(['*.py'])
    .pipe(gulpPep8());
});

