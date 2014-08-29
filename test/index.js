var thunkify = require('thunkify');
var assert = require('assert');
var fs = require('fs');

describe('cocha', function(){

  it('should work when async', function *(){
    function read(file, fn) {
      setTimeout(function(){
        fn(null, 'file: ' + file);
      }, 5);
    }

    read = thunkify(read);

    var res = yield read('foo.txt');
    assert('file: foo.txt' == res);
  })

})