# 8bits [![Build Status](https://travis-ci.org/akenn/8bits.svg?branch=master)](https://travis-ci.org/akenn/8bits)

> A Javascript library for manipulating and converting byte values

## Install

```sh
$ npm install --save 8bits
```

## Usage

```js
var byte = require('8bits');

byte(1023);
//=> 1023 B

byte(1025);
//=> 1 KB

// convert from one format to another
byte(512000, {from: 'KB', to: 'MB'});
//=> 500 MB

// use bits instead of bytes
byte(1024, {from: 'B', to: 'KB', useBits: true, digits: 2});
//=> 1.02 KB
```

## Todo

- Add better examples
- Support pluralization
- Retrieve byte value from human-readable value (i.e. 1 MB => 1048576)
- More tests!

## License

MIT © [Andrew Kennedy](https://akenn.org)
