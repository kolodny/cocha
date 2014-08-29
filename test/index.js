var thunkify = require('thunkify');
var assert = require('assert');
var fs = require('fs');

describe('cocha', function() {

  describe('it should work when yielding and', function() {
    var ensureFunctionContinuedPassedYield;

    it('should call the yielding function', function *(){
      function read(file, fn) {
        setTimeout(function(){
          fn(null, 'file: ' + file);
        }, 5);
      }

      read = thunkify(read);

      var res = yield read('foo.txt');
      assert.equal('file: foo.txt', res);
      ensureFunctionContinuedPassedYield = true;
    });

    it('should have continued execution passed the yield', function(next) {
      setTimeout(function() {
        assert(ensureFunctionContinuedPassedYield);
        next();  
      }, 15);
    });

  });


})