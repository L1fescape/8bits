'use strict';
var _ = require('underscore');
var sprintf = require('underscore.string/sprintf');

// Prefixes for multiples of bits (b) or bytes (B)
//      Decimal                   Binary
// ================================================
// Value    Metric   |  Value    JEDEC       IEC
// 1000     k kilo   |  1024     K kilo    Ki  kibi
// 1000^2   M mega   |  1024^2   M mega    Mi  mebi
// 1000^3   G giga   |  1024^3   G giga    Gi  gibi
// 1000^4   T tera   |  1024^4   – –       Ti  tebi
// 1000^5   P peta   |  1024^5   – –       Pi  pebi
// 1000^6   E exa    |  1024^6   – –       Ei  exbi
// 1000^7   Z zetta  |  1024^7   – –       Zi  zebi
// 1000^8   Y yotta  |  1024^8   – –       Yi  yobi

var getUnitsObj = function(units, decimal){
  var decimalUnits = {
    B: 'B',
    KB: 'kB',
    MB: 'MB',
    GB: 'GB',
    TB: 'TB', 
    PB: 'PB',
    EB: 'EB',
    ZB: 'ZB',
    YB: 'YB'
  };

  if (!decimal) {
    decimalUnits['KB'] = 'KB';
  }

  return _.extend(decimalUnits, units);
};

var convert = function(value, units, inputUnit, outputUnit, k){
  inputUnit = inputUnit.toUpperCase();
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
  var units = getUnitsObj(options.units, decimal);
  var unitKeys = _.keys(units);
  var digits = options.digits || 0;
  var inputUnit = options.from || 'B';
  var outputUnit = options.to;
  var value;
  var unit;
  var i;

  if (typeof bytes === 'string'){
    bytes = parseInt(bytes, 10);
  }

  // convert to bytes
  if (inputUnit !== 'B'){
    bytes = convert(bytes, unitKeys, inputUnit, 'B', k);
  }

  // convert from bytes to either the desired output unit or the highest unit prefix
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
