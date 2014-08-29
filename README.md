Cocha
===

Ripped shamelessly from https://labnotes.org/yield-to-the-test-using-mocha-with-es6-generators/

first install with

```js
npm install cocha
npm install mocha
```

then you can test co friendly mocha code:

```js
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
```

testing: `npm test`
