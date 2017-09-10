# 8bits [![Build Status](https://travis-ci.org/l1fescape/8bits.svg?branch=master)](https://travis-ci.org/L1fescape/8bits)

> A Javascript library for manipulating and converting byte values

There are two primary ways to represent byte sizes: SI units (decimal / Base 10 / 10^3) and IEC units (binary / Base 2 / 2^10). `8bits` supports both of decimal and binary formats, with the default format being decimal.

## Install

```sh
$ npm install --save 8bits
```

## Usage

```js
var byte = require('8bits');

byte(789);
//=> 789 B

byte(1000);
//=> 1 kB

// Setting the number of decimal places
byte(1024, {digits: 2});
//=> 1.02 kB

// Using binary instead of decimal
byte(1024, {digits: 2, binary: true});
//=> 1.00 KB

// Converting from one prefix to another
byte(500000, {from: 'kB', to: 'MB'});
//=> 500 MB

byte(512000, {from: 'KB', to: 'MB', binary: true});
//=> 500 MB

// Formatting the return value
byte(512000000, {format: '%s - %s'});
//=> 512 - kB

// Using custom unit values
byte(2000000, {
  units: {
    MB: 'Megabytes'
  }
});
//=> 2 Megabytes

// All together
byte(2000000000000, {
  from: 'MB',
  to: 'YB',
  format: '%s (%s)',
  binary: true,
  digits: 6,
  units: {
    YB: 'yoda bytes'
  }
});
//=> 0.000002 (yoda bytes)
```

## Todo

- Retrieve byte value from human-readable value (i.e. 1 MB => 1048576)
- Include API in Readme

## Useful Information

```
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
```

- [Binary Prefixes](http://en.wikipedia.org/wiki/Binary_prefix)
- [kb, kB, KiB… What’s Up With That?](https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/).

## License

MIT © [Andrew Kennedy](https://l1fescape.com)
