#!/usr/bin/env node

const prog = require('caporal');
const createLib = require('./lib/create');

prog
  .version('1.1.4')
  .command('new', 'Create a new Vuebly application')
  .alias('create')
  .argument('<projectName>', 'The project name')
  .option('-i, --ios', 'Add iOS platform support')
  .option('-a, --android', 'Add Android platform support')
  .option('-t, --templateUrl <URL>', 'Using a remote template')
  .action(createLib);

prog.parse(process.argv);
