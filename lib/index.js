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

gulpPep8.prototype.lint = (file, opts) => {
  return new Promise((resolve, reject) => {
    // get file name as the first arg
    let args = [file.history[0]];

    for (k in opts) {
      // include passed options if any
      let v = (opts[k] instanceof Array) ? opts[k].join(','): opts[k]
      args.push(`--${k}=${v}`);
    }

    const lint = spawn('pycodestyle', args);

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

module.exports = function(opts = {}){
  let pep8 = gulpPep8();
  return through2.obj(async function(data, enc, cb){
    await pep8.lint(data, opts);
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


