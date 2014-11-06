'use strict';

var concat = require('concat-stream')
  , through = require('through2');


module.exports = function (opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = null;
  }
  opts = opts || {};
  opts.parse = opts.parse || JSON.parse;

  var input = through();

  input.pipe(concat({ encoding: 'string' }, function (data) {
    try {
      var object = opts.parse(data);
    }
    catch (e) {
      return cb(e);
    }
    return cb(null, object);
  }));

  return input;
};
