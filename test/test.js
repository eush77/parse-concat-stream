'use strict';

var parseConcat = require('..');

var stread = require('stread');


it('should concat-stream and JSON.parse', function (done) {
  var data = {
    name: null,
    version: "1.1.1",
    tags: [true, "awesomeness", [{}]]
  };

  stread(JSON.stringify(data, null, 2))
             .pipe(parseConcat(function (err, result) {
               (err == null).should.be.true;
               result.should.eql(data);
               done();
             }));
});


it('should propagate the error', function (done) {
  stread('{')
    .pipe(parseConcat(function (err) {
      err.should.be.an.Error;
      done();
    }));
});
