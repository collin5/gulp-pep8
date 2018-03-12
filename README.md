
<img src="/screenshots/gulp-pep8.png" alt="logo" width="450"/>

# Gulp Pep8
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

  :closed_book: Gulp plugin for pep8 coding standards
 
 ## Installation
  In your terminal, do

 ```
 npm install gulp-pep8
 ```
 
## Usage
```javascript
const gulpPep8 = require('gulp-pep8')
const gulp = require('gulp');

gulp.task('lint', () => {
  return gulp.src('*.py')
    .pipe(gulpPep8());
});
```
#### With options
To use with custom options, we pass them as a key, value pair object i.e

```javascript
gulp.task('lint', () => {
  return gulp.src('*.py')
    .pipe(gulpPep8({
        ignore: ['E501', 'E731', ...],
        onFail: () => {
        // when we get errors
        }
        ...
      }));
});
```


## License
Gulp pep8 is licensed under the terms of MIT [license](LICENSE.md) and is available for free.
