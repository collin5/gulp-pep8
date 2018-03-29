/**
 * @file lib/index.js
 */
const { spawn } = require('child_process');
const util = require('util');

const colors = require('ansi-colors');
const through2 = require('through2');

let errors = [];

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gulpPep8();
}

gulpPep8.prototype.lint = (file, opts) => {
  return new Promise((resolve, reject) => {
    // get file name as the first arg
    let args = [file.history[0]];
    let lint;

    for (k in opts) {
      // allow custom lint, also used when testing
      if (k === 'lintFunc') {
        lint = opts[k];
        continue;
      }
      // include passed options if any
      let v = Array.isArray(opts[k]) ? opts[k].join(',') : opts[k];
      args.push(`--${k}=${v}`);
    }

    lint = (!lint) ? spawn('pycodestyle', args): lint;

    lint.stdout.on('data', (data) => {
      for (err of data.toString().split('\n')) {
        if (!!err) {
          errors.push(err);
        }
      }
    });
    lint.stderr.on('data', (err) => {
      reject(err.toString());
    });
    lint.on('close', () => {
      resolve();
    });
  });
}

module.exports = (opts = {}) => {
  let pep8 = gulpPep8();
  let onFail;
  // get onfail callback if present
  for (k in opts) {
    if (k === 'onFail') {
      onFail = opts[k];
      delete opts[k];
    }
  }
  return through2.obj(async function (data, enc, cb) {
    await pep8.lint(data, opts);
    this.push(data);
    cb();
  }).on('end', () => {
    if (errors.length) {
      for (err of errors) {
        console.log(err);
      }
      console.log(colors.red(`[FAIL] ${errors.length} error(s) found. `));
      if (typeof onFail === 'function') {
        onFail();
      }
    }
  });
};
