var _s = require('underscore.string');

module.exports = function(bytes, options){
  options = options || {};
  var sizes = options.sizes || ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var format = options.format || '%d %s';
  var k = options.decimal ? 1000 : 1024;
  var value;
  var unit;
  var i;

  if (typeof bytes === 'string'){
    bytes = parseInt(bytes);
  }

  if (bytes === 0) {
    value = 0;
    unit = sizes[0];
  } else {
    i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    value = Math.round(bytes / Math.pow(1024, i));
    unit = i < sizes.length ? sizes[i] : sizes[sizes.length - 1];
  }

  return _s.sprintf(format, value, unit);
};
