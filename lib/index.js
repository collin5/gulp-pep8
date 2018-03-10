const { Transform } = require('stream');
const util = require('util');

function gulpPep8() {
  if (!(this instanceof gulpPep8))
    return new gupPep8();
  Transform.call(this);
}

util.inherits(gulpPep8, Transform);

gulpPep8.prototype._transform = function(data, enc, cb) {
 // TODO: lint files
  cb();
}

module.exports = gulpPep8


