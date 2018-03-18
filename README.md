# Gulp Pep8
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com) 
[![Build Status](https://travis-ci.org/collin5/gulp-pep8.svg?branch=master)](https://travis-ci.org/collin5/gulp-pep8)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  :closed_book: Gulp plugin for pep8 coding standards
 
## Installation

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
Gulp pep8 is licensed under the terms of [MIT](LICENSE.md) license and is available for free.
