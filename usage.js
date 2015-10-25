// path: where to find the module's package.json
// cmd: what 'base' cmd should be used for the version command

var 
  Vantage = require('./lib/command-proxy.js')(require('vantage')(), {path:'..', cmd:'test'})
  ;



Vantage
  .Proxy
    .command('test', 'tests proxy')
      .action(function(cmd,cb) {
        cb('this has no logic');
      });

Vantage
  .Proxy
    .mode('test2')
      .delimiter( 'test2>' )
      .description('tests proxy, too')
      .action(function(cmd,cb) {
        cb('this has no logic (2)');
      });

Vantage
  .delimiter('node~$')

  .listen(8001)
  .show();