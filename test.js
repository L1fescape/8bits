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
    sizes: [
      'Bytes',
      'Kilobytes',
      'Megabytes'
    ]
  };
  expect(byte(0, options)).to.equal('0 Bytes');
  expect(byte(1023, options)).to.equal('1023 Bytes');
  expect(byte(1024, options)).to.equal('1 Kilobytes');
  expect(byte(1048576, options)).to.equal('1 Megabytes');
});

it('should support custom formats', function () {
  expect(byte(0, {
    format: '%d - %s'
  })).to.equal('0 - B');
  expect(byte(1024, {
    format: '%d%s'
  })).to.equal('1KB');
});
