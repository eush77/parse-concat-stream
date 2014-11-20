'use strict';

var concat = require('concat-stream')
  , through = require('through2');


module.exports = function (opts, cb) {
  if (typeof opts == 'function') {
    cb = opts;
    opts = {};
  }
  else {
    opts = opts || {};
  }

  if (opts.parse === undefined) {
    opts.parse = JSON.parse;
  }
  else if (opts.parse === null) {
    opts.parse = function (s) { return s; };
  }

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
