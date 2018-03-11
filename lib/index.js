/**
 * @file lib/index.js
 */
const util = require('util');
const through2 = require('through2');
const { spawn } = require('child_process');
let errors = [];

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gulpPep8();
}

gulpPep8.prototype.lint = (file) => {
  return new Promise((resolve, reject) => {
    const lint = spawn('pycodestyle', [file.history[0]]);
    lint.stdout.on('data', (data) => {
      errors.push(data.toString())
    });
    lint.stderr.on('data', (err) => {
      reject(err.toString());
    });
    lint.on('close', () => {
      resolve();
    });
  });
}

module.exports = function(){
  let pep8 = gulpPep8();
  return through2.obj(async function(data, enc, cb){
    await pep8.lint(data);
    this.push(data);
    cb();
  }).on('end', () => {
    if (!!errors){
      for(err of errors) {
        console.log(err);
      }
    }
  });
}


