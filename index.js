'use strict';
var _ = require('underscore');
var sprintf = require('underscore.string/sprintf');

var getUnitsObj = function(options){
  var base = {
    B: 'B',
    KB: 'KB',
    MB: 'MB',
    GB: 'GB',
    TB: 'TB', 
    PB: 'PB',
    EB: 'EB',
    ZB: 'ZB',
    YB: 'YB'
  };

  return _.extend(base, options.units);
};

var convert = function(value, units, inputUnit, outputUnit, k){
  var i = _.indexOf(units, inputUnit);
  value = value * Math.pow(k, i);
  i = _.indexOf(units, outputUnit);
  return value / Math.pow(k, i);
};

module.exports = function(bytes, options){
  options = options || {};
  var units = getUnitsObj(options);
  var unitKeys = _.keys(units);
  var format = options.format || '%s %s';
  var k = options.useBits ? 1000 : 1024;
  var digits = options.digits || 0;
  var inputUnit = options.from || 'B';
  var outputUnit = options.to;
  var value;
  var unit;
  var i;

  if (typeof bytes === 'string'){
    bytes = parseInt(bytes);
  }

  // convert to bytes
  if (inputUnit !== 'B'){
    bytes = convert(bytes, unitKeys, inputUnit, 'B', k);
  }

  if (outputUnit){
    value = convert(bytes, unitKeys, 'B', outputUnit, k);
    unit = outputUnit;
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
