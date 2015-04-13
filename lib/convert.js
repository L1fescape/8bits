'use strict';
var _ = require('lodash');

module.exports = function(value, units, inputUnit, outputUnit, decimal){
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

  // convert input to Bytes
  value = value * Math.pow(k, i);

  if (outputUnit) {
    outputUnit = outputUnit.toUpperCase();
    i = _.indexOf(unitKeys, outputUnit);
  } else {
    value = (value / Math.pow(k, i));
    i = Math.floor(Math.log(value) / Math.log(k));
  }

  if (value < 1) {
    converted = value;
    i = 0;
  } else {
    converted = (value / Math.pow(k, i));
  }

  return {
    value: converted, 
    unit: i < unitKeys.length ? units[unitKeys[i]] : units[_.last(unitKeys)]
  };
};
