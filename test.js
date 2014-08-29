var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var args = [ __dirname + '/node_modules/.bin/cocha' ];
var ncp = require('ncp').ncp;
var rmdir = require('rimraf');
var co = require('co');
var thunkify = require('thunkify');

rmdir = thunkify(rmdir);
ncp = thunkify(ncp);
var mkdir = thunkify(fs.mkdir);
var unlink = thunkify(fs.unlink);
var symlink = thunkify(fs.symlink);
var write = thunkify(fs.writeFile);
var read = thunkify(fs.readFile);

co(function *() {
  var npmBin = __dirname + '/node_modules/.bin';
  var npmCochaDir = __dirname + '/node_modules/cocha';
  var npmCochaBin = npmCochaDir + '/bin';
  try {
    yield rmdir(npmCochaDir);
  } catch (e) {}
  yield mkdir(npmCochaDir);
  yield write(npmCochaDir + '/mocha-es6.js', yield read(__dirname + '/mocha-es6.js'))
  yield mkdir(npmCochaBin);
  yield ncp(__dirname + '/bin', npmCochaBin);

  try {
    yield [
      unlink(npmBin + '/cocha'),
      unlink(npmBin + '/_cocha'),
    ];    
  } catch (e) {}
  yield [
    symlink(npmCochaBin + '/cocha', npmBin + '/cocha'),
    symlink(npmCochaBin + '/_cocha', npmBin + '/_cocha'),
  ];



  var proc = spawn(process.argv[0], args, { customFds: [0,1,2] });
  proc.on('exit', function (code, signal) {
    process.on('exit', function(){
      if (signal) {
        process.kill(process.pid, signal);
      } else {
        process.exit(code);
      }
    });
  });
})();





