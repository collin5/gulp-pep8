const util = require('util');
const through2 = require('through2');
const { spawn } = require('child_process');

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gulpPep8();
}

gulpPep8.prototype.lint = (file) => {
  return new Promise((resolve, reject) => {
    const lint = spawn('pycodestyle', [file.history[0]]);
    let res = ''; 
    lint.stdout.on('data', (data) => {
      res = data;
    });
    lint.stderr.on('data', (err) => {
      reject(err.toString());
    });
    lint.on('close', () => {
      resolve(res);
    });
  });
}

module.exports = function(){
  let pep8 = gulpPep8();
  return through2.obj(async function(data, enc, cb){
    this.push(await pep8.lint(data));
    cb();
  });
}


