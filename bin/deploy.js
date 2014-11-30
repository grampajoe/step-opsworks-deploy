#!/usr/bin/env node

var cli = require('../lib/cli'),
    deploy = require('../lib/deploy');

cli(process.argv, deploy);
