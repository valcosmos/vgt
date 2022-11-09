#!/usr/bin/env node

import importLocal from 'import-local'

import { filename } from 'dirname-filename-esm'

const __filename = filename(import.meta)

import { log } from '../../utils/index.js'

import entry from '../lib/index.js'

if (importLocal(__filename)) {
  log.info('Info==>', 'You are using the local **vgt**')
} else {
  entry(process.argv.slice(2))
}
