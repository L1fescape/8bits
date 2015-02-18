# 8bits [![Build Status](https://travis-ci.org/akenn/8bits.svg?branch=master)](https://travis-ci.org/akenn/8bits)

> A Javascript library for manipulating and converting byte values

There are two primary ways to represent byte sizes: SI units (decimal / base-10 / 10^3) and IEC units (binary; / base 2 / 2^10). `8bits` supports both of formats, with the default being decimal. You can read more on this subject [here](http://en.wikipedia.org/wiki/Binary_prefix) and [here](https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/).

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

// Setting the number of significant digits
byte(1024, {digits: 2});
//=> 1.02 kB

// Using binary instead of decimal
byte(1024, {digits: 2, binary: true});
//=> 1.00 KB

// Converting from one prefix to another
byte(500000, {from: 'kB', to: 'MB'});
//=> 500 MB
byte(512000, {from: 'kB', to: 'MB', binary: true});
//=> 500 MB
```

## Todo

- Retrieve byte value from human-readable value (i.e. 1 MB => 1048576)
- Improve Readme

## License

MIT © [Andrew Kennedy](https://akenn.org)
