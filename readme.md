
# pdb-wrapper - alfa version, should not be used

## Install

### Install npm plugin


    npm i @ngx-dnd/pdb-wrapper

or

    yarn add @ngx-dnd/pdb-wrapper

### If have a error

> "error TS1192: Module '"/app/node_modules/@types/pouchdb/index"' has
> no default export."

 add to your tsconfig.json line:

    "allowSyntheticDefaultImports": true,

### If have a error

    browser.js:2 Uncaught ReferenceError: global is not defined
        at Object../node_modules/immediate/lib/browser.js (browser.js:2)
        at __webpack_require__ (bootstrap:78)
        at Module../node_modules/pouchdb/lib/index-browser.es.js (index-browser.es.js:1)
        at __webpack_require__ (bootstrap:78)
        at Module../projects/ngx-dnd/pdb/src/lib/pdb-init.service.ts (pdb-core.service.ts:11)
        at __webpack_require__ (bootstrap:78)
        at Module../projects/ngx-dnd/pdb/src/public_api.ts (public_api.ts:1)
        at __webpack_require__ (bootstrap:78)
        at Module../src/app/home/home.component.ts (main.js:6648)
        at __webpack_require__ (bootstrap:78)

Add following code in your starting page e.g. index.html


    var global = global || window;
        var Buffer = Buffer || [];
        var process = process || {
          env: { DEBUG: undefined },
          version: []
        };


e.g. follows:

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Client</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <script>
        var global = global || window;
        var Buffer = Buffer || [];
        var process = process || {
          env: { DEBUG: undefined },
          version: []
        };
      </script>
    </head>
    <body>
      <app-root>
        <div class="loader"></div>
      </app-root>
    </body>
    </html>
