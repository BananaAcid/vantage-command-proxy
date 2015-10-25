# vantage-command-proxy
Info Proxy for vantage.js commands

This allow command statements to be routed through vcp to be listable with the version command

(this will be used in all my vantage plugins)

##### Installation

```bash
npm install vantage
npm install vantage-command-proxy
```

##### Programmatic use

```js
// index.js

// path: where to find your module's package.json 
// cmd: what 'base' cmd should be used for the version command
var Vantage = require('./lib/command-proxy.js')(require('vantage')(), {path:'..', cmd:'test'})
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
  .show();
```

##### What it does

it adds a version group command, that all modules may use to add their version
```
node~$ version

  Commands:

    version xyzmodule      the-xyzmodule version ?.?.?

```

You may open the help to see its details, and possible commands (example)
```
node~$ version xyzmodule
Author
 * Nabil Redmann (BananaAcid)
 * bananaacid.de
INFO
 * Info Proxy for vantage.js commands

Commands:
 - version xyzmodule
 - xyzmodule
 ```
