const { Duplex } = require('stream');
const util = require('util');

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gulpPep8();

  Duplex.call(this);
}

util.inherits(gulpPep8, Duplex);

gulpPep8.prototype.write = function(data, enc, cb) {
 // TODO: lint files
}

gulpPep8.prototype._read = function() {  }


module.exports = gulpPep8


