#! /usr/bin/env node

const yargs = require('yargs')
const debootstrap = require('../')

const argv = yargs
  .options({
    path: {
      alias: 'p',
      describe: 'Path to a project',
      default: process.cwd()
    },
    includeDevDependencies: {
      alias: 'd',
      describe: 'Whether to consider dev dependencies too'
    }
  })
  .help()
  .argv

debootstrap(argv)
