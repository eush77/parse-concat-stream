'use strict';

var concat = require('concat-stream')
  , through = require('through2');


module.exports = function (cb) {
  var input = through();

  input.pipe(concat({ encoding: 'string' }, function (data) {
    try {
      var object = JSON.parse(data);
    }
    catch (e) {
      return cb(e);
    }
    return cb(null, object);
  }));

  return input;
};
