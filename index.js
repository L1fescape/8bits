'use strict';
var _ = require('lodash');
var prefixes = require('binary-prefix');
var sprintf = require('underscore.string').sprintf;
var numberFormat = require('underscore.string').numberFormat;
var convert = require('./lib/convert');

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
    minSigFigs: options.minSigFigs || null,
    convert: {
      from: options.from ? options.from.toUpperCase() : 'B',
      to: options.to ? options.to.toUpperCase() : null
    },
    numberFormatOptions: options.numberFormatOptions || []
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

  // convert to bytes
  if (config.convert.from !== 'B'){
    bytes = convert(bytes, config.units, config.convert.from, 'B', config.decimal).value;
  }

  if (bytes === 0) {
    value = 0;
    unit = config.units.B;
    return sprintf(config.outputFormat, numberFormat.apply( numberFormat, [value].concat(config.numberFormatOptions)), unit);
  }

  var converted = convert(bytes, config.units, 'B', config.convert.to, config.decimal);
  value = converted.value;
  unit = converted.unit;

  if (config.minSigFigs && value.toString().replace('.', '').length <= config.minSigFigs){
    value = value.toPrecision(config.minSigFigs);
  } else if (value > 1 || unit !== 'B') {
    value = value.toFixed(config.digits);
  }

  return sprintf(config.outputFormat, numberFormat.apply(numberFormat, [+value].concat(config.numberFormatOptions)), unit);
};
