#!/usr/bin/env node

var cli = require('../lib/cli'),
    deploy = require('../lib/deploy');

try {
  cli(process.argv, deploy);
}
catch(err) {
  // Display argument required errors nicely
  if (err.message.match(/--[a-zA-Z-]+ is required/)) {
    console.error();
    console.error('  error: ' + err.message);
    console.error();
    process.exit(1);
  } else {
    throw err;
  }
}
