'use strict';
var _ = require('lodash');
var prefixes = require('binary-prefix');
var sprintf = require('underscore.string/sprintf');

function parseOptions(options) {
  options = options || {};
  var decimal = options.binary ? false : true;
  return {
    decimal: decimal,
    outputFormat: options.format || '%s %s',
    units: prefixes({
      custom: options.units,
      decimal: decimal
    }),
    digits: options.digits || 0,
    significantDigits: null,
    convert: {
      from: options.from ? options.from.toUpperCase() : 'B',
      to: options.to ? options.to.toUpperCase() : null
    }
  };
};


var convert = function(value, units, inputUnit, outputUnit, decimal){
  var unitKeys = _.keys(units);
  var converted;
  var k = decimal ? 1000 : 1024;
  var i;

  if (inputUnit) {
    inputUnit = inputUnit.toUpperCase();
  } else {
    inputUnit = 'B';
  }

  i = _.indexOf(unitKeys, inputUnit);

  if (i < 0){
    i = 0;
  }

  value = value * Math.pow(k, i);

  if (outputUnit) {
    outputUnit = outputUnit.toUpperCase();
    i = _.indexOf(unitKeys, outputUnit);
  } else {
    value = (value / Math.pow(k, i));
    i = Math.floor(Math.log(value) / Math.log(k));
  }

  converted = (value / Math.pow(k, i));

  return {
    value: converted, 
    unit: i < unitKeys.length ? units[unitKeys[i]] : units[_.last(unitKeys)]
  };
};


module.exports = function(bytes, options){
  var config = parseOptions(options);
  var value;
  var unit;

  if (typeof bytes === 'string'){
    bytes = parseInt(bytes, 10);
  }

  if (_.isNaN(bytes) || !_.isNumber(bytes)){
    bytes = 0;
  }

  if (bytes < 1){
    return sprintf(config.outputFormat, (bytes).toString(), 'B');
  }

  // convert to bytes
  if (config.convert.from !== 'B'){
    var tmp = convert(bytes, config.units, config.convert.from, 'B', config.decimal);
    bytes = tmp.value;
  }

  if (bytes === 0) {
    value = 0;
    unit = units.B;
  } else {
    var tmp = convert(bytes, config.units, 'B', config.convert.to, config.decimal);
    value = tmp.value;
    unit = tmp.unit;
  }

  value = value.toFixed(config.digits);

  return sprintf(config.outputFormat, value, unit);
};
