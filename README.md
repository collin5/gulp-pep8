
<p align="center">
<img src="/screenshots/gulp-pep8.png" alt="logo" width="450"/>
</p>


# Gulp Pep8
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

 Gulp plugin for pep8 coding standards
 
 ## Installation
 ```
 npm install gulp-pep8
 
 ```
## Usage
```
const gulpPep8 = require('gulp-pep8')
const gulp = require('gulp');

gulp.task('lint', () => {
  return gulp.src('*.py')
    .pipe(gulpPep8());
});
```


## License
Gulp pep8 is licensed under the terms of MIT license and is available for free.
