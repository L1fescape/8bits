'use strict';
var _ = require('lodash');
var prefixes = require('binary-prefix');
var sprintf = require('underscore.string/sprintf');

var convert = function(value, units, inputUnit, outputUnit, k){
  inputUnit = inputUnit.toUpperCase();
  outputUnit = outputUnit.toUpperCase();
  var i = _.indexOf(units, inputUnit);
  if (i < 0){
    i = 0;
  }
  value = value * Math.pow(k, i);
  i = _.indexOf(units, outputUnit);
  return value / Math.pow(k, i);
};

module.exports = function(bytes, options){
  options = options || {};
  var format = options.format || '%s %s';
  var decimal = !options.binary;
  var k = decimal ? 1000 : 1024;
  var units = prefixes({
    custom: options.units,
    decimal: decimal
  });
  var unitKeys = _.keys(units);
  var digits = options.digits || 0;
  var inputUnit = options.from ? options.from.toUpperCase() : 'B';
  var outputUnit = options.to ? options.to.toUpperCase() : null;
  var value;
  var unit;
  var i;

  if (typeof bytes === 'string'){
    bytes = parseInt(bytes, 10);
  }

  if (_.isNaN(bytes) || !_.isNumber(bytes)){
    bytes = 0;
  }

  if (bytes < 1){
  return sprintf(format, (bytes).toString(), 'B');
  }

  // convert to bytes
  if (inputUnit !== 'B'){
    bytes = convert(bytes, unitKeys, inputUnit, 'B', k);
  }

  // convert from bytes to either the desired output unit or the highest unit prefix
  if (outputUnit){
    value = convert(bytes, unitKeys, 'B', outputUnit, k);
    unit = units[outputUnit];
  } else if (bytes === 0) {
    value = 0;
    unit = units[_.first(unitKeys)];
  } else {
    i = Math.floor(Math.log(bytes) / Math.log(k));
    value = (bytes / Math.pow(k, i));
    unit = i < unitKeys.length ? units[unitKeys[i]] : units[_.last(unitKeys)];
  }

  value = value.toFixed(digits);

  return sprintf(format, value, unit);
};
