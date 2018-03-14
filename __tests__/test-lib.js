/**
 * @file __tests__/test-lib.js
 */
const gulpPep8 = require("../lib/");
const sinon = require('sinon');
const { assert, expect } = require('chai');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

// mock spawning process
let Spawn = function(){
  if (!(this instanceof Spawn))
    return new Spawn();
  EventEmitter.call(this);
}

util.inherits(Spawn, EventEmitter);

Spawn.prototype.stderr = new EventEmitter;
Spawn.prototype.stdout = new EventEmitter;

const mockFile = {
  history:[
    'blahblah'
  ],
}

describe('@Test_GulpPep8', () => {
  it('should be able to lint file', (done) =>{
    let opts = {
      lintFunc: Spawn()
    };
    const gp = gulpPep8(opts);
    let callback = sinon.spy();

    gp._write(mockFile, 'utf-8', callback);

    // manually close stream
    opts['lintFunc'].emit('close');

    setTimeout(() => {
      assert(callback.calledOnce);
      done();
    }, 100);
  });

  it('should be able to pick onFail callback from options', (done) => {
    let opts = {
      onFail: () => {},
      lintFunc: Spawn()
    };
    const gp = gulpPep8(opts);

    gp._write(mockFile, 'utf-8', () => {});
    setTimeout(() => {
      expect(opts).to.not.have.property('onFail');
      done();
    }, 100);
  });
});

