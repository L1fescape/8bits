'use strict';
var expect = require('chai').expect;
var byte = require('./');

it('should format bytes with the correct unit', function () {
  expect(byte(0)).to.equal('0 B');
  expect(byte(1023)).to.equal('1023 B');
  expect(byte(1024)).to.equal('1 KB');
  expect(byte(2048)).to.equal('2 KB');
  expect(byte(1048576)).to.equal('1 MB');
});

it('should allow custom units', function () {
  var options = {
    units: {
      B: 'Bytes',
      MB: 'Megabytes'
    }
  };
  expect(byte(1023, options)).to.equal('1023 Bytes');
  expect(byte(1024, options)).to.equal('1 KB');
  expect(byte(1048576, options)).to.equal('1 Megabytes');
});

it('should support custom formats', function () {
  expect(byte(0, {
    format: '%s - %s'
  })).to.equal('0 - B');
  expect(byte(1024, {
    format: '%s%s'
  })).to.equal('1KB');
});

it('should support base-10', function () {
  expect(byte(999, {useBits: true})).to.equal('999 B');
  expect(byte(1023, {useBits: true})).to.equal('1 KB');
  expect(byte(1024, {from: 'B', to: 'KB', useBits: true, digits: 2})).to.equal('1.02 KB');
  expect(byte(1023, {useBits: true, digits: 2})).to.equal('1.02 KB');
});

it('should support specifying number of useBits places', function () {
  var options = {
    useBits: true,
    digits: 5
  };
  expect(byte(999, options)).to.equal('999.00000 B');
  expect(byte(1048576, options)).to.equal('1.04858 MB');
});

it('should convert from one unit to another', function () {
  expect(byte(100, {from: 'KB', to: 'B'})).to.equal('102400 B');
  expect(byte(100, {from: 'KB', to: 'B', useBits: true})).to.equal('100000 B');
  expect(byte(524288000, {from: 'B', to: 'MB'})).to.equal('500 MB');
  expect(byte(512000, {from: 'KB', to: 'MB'})).to.equal('500 MB');
  expect(byte(500, {from: 'MB', to: 'B'})).to.equal('524288000 B');
});
