#!/bin/bash

rm -rf build
babel --source-maps --out-dir build src/
replace --silent '##VERSION##' `node -e "console.log(require('./package.json').version)"` build/config/cli.js

# For executing in local machine
chmod 755 build/index.js
