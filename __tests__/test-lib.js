/**
 * @file __tests__/test-lib.js
 */
const gulpPep8 = require("../lib/");
const sinon = require('sinon');
const { assert, expect } = require('chai');

const mockFile = {
  history:[
    'blahblah'
  ],
}

describe('@Test_GulpPep8', () => {
  it('should be able to lint file', (done) =>{
    const gp = gulpPep8();
    let callback = sinon.spy();

    gp._write(mockFile, 'utf-8', callback);
    setTimeout(() => {
      assert(callback.calledOnce);
      done();
    }, 100);
  });

  it('should be able to pick onFail callback from options', (done) => {
    let opts = {
      onFail: () => {},
    };
    const gp = gulpPep8(opts);

    gp._write(mockFile, 'utf-8', () => {});
    setTimeout(() => {
      expect(opts).to.not.have.property('onFail');
      done();
    }, 100);
  });
});

