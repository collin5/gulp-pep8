const util = require('util');
const through2 = require('through2');

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gulpPep8();
}

module.exports = function(){
  return through2.obj(function(data, enc, cb){
    this.push(data.contents)
    cb();
  });
}


