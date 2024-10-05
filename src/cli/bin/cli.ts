#!/usr/bin/env node

import process from 'node:process'

import { filename } from 'dirname-filename-esm'

import importLocal from 'import-local'

import { log } from '../../utils'

import entry from '../lib'

const __filename = filename(import.meta)

if (importLocal(__filename)) {
  log.info('Info==>', 'You are using the local **vgt**')
}
else {
  entry(process.argv)
}
