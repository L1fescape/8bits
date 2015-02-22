'use strict';
var expect = require('chai').expect;
var byte = require('./');

it('should format bytes with the correct unit', function () {
  expect(byte(0)).to.equal('0 B');
  expect(byte(1000)).to.equal('1 kB');
  expect(byte(1024)).to.equal('1 kB');
  expect(byte(2048)).to.equal('2 kB');
  expect(byte(1048576)).to.equal('1 MB');
});

it('should allow overriding units', function () {
  var options = {
    units: {
      B: 'Bytes',
      MB: 'Megabytes'
    }
  };
  expect(byte(100, options)).to.equal('100 Bytes');
  expect(byte(1024, options)).to.equal('1 kB');
  expect(byte(1048576, options)).to.equal('1 Megabytes');
});

it('should support custom formatting', function () {
  expect(byte(0, {
    format: '%s - %s'
  })).to.equal('0 - B');

  expect(byte(1024, {
    format: '%s%s'
  })).to.equal('1kB');

  expect(byte(1024, {
    format: '%s%s',
    digits: 2
  })).to.equal('1.02kB');
});

it('should support binary format', function () {
  expect(byte(999, {binary: true})).to.equal('999 B');
  expect(byte(1023, {binary: true})).to.equal('1023 B');
  expect(byte(1024, {from: 'B', to: 'KB', binary: true, digits: 2})).to.equal('1.00 KB');
  expect(byte(1023, {binary: true, digits: 2})).to.equal('1023.00 B');
});

it('should convert from one unit to another', function () {
  expect(byte(1, {from: 'kB', to: 'kB'})).to.equal('1 kB');
  expect(byte(100, {from: 'kB', to: 'B'})).to.equal('100000 B');
  expect(byte(100, {from: 'kB', to: 'B', binary: true})).to.equal('102400 B');
  expect(byte(100, {from: 'kB', to: 'B', useBits: true})).to.equal('100000 B');
  expect(byte(524288000, {from: 'B', to: 'MB'})).to.equal('524 MB');
  expect(byte(512000, {from: 'kB', to: 'MB'})).to.equal('512 MB');
  expect(byte(500, {from: 'MB', to: 'B'})).to.equal('500000000 B');
});

it('should be able to use all settings in tandem', function () {
  var options = {
    from: 'MB',
    to: 'YB',
    format: '%s (%s)',
    binary: true,
    digits: 6,
    units: {
      YB: 'yoda bytes'
    }
  };
  expect(byte(2000000000000, options)).to.equal('0.000002 (yoda bytes)');
});
