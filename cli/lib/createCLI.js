//用于读取json文件
import fse from 'fs-extra'

import path from 'node:path'

import { program } from 'commander'

import { dirname } from 'dirname-filename-esm'

import gradient from 'gradient-string'

const __dirname = dirname(import.meta)

const pkgPath = path.resolve(__dirname, '../../package.json')

import { log } from '../../utils/index.js'
import semver from 'semver'
import chalk from 'chalk'

const pkg = fse.readJsonSync(pkgPath)

const LOWER_NODE_VERSION = '14.0.0'

//检查node版本
function checkNodeVersion() {
  // console.log(process.version)
  log.verbose('node version', process.version)

  if (!semver.gte(process.version, LOWER_NODE_VERSION)) {
    throw new Error(chalk.red(`The version of Node.js must be above 1.2${LOWER_NODE_VERSION}`))
  }
}

function preAction() {
  //  检查node版本
  checkNodeVersion()
}

export default function createCLI() {
  // log.info('version', pkg.version)

  console.log('\n')

  console.log(gradient('#2af598', '#009efd')('==> Hi, Welcome to use vgt 👋'))

  console.log('\n')

  log.info('version', pkg.version)

  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', 'Whether to enable debug mode', false)
    .hook('preAction', preAction)

  program.on('option:debug', function () {
    //是否开启了debug模式
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  program.on('command:*', function (obj) {
    log.error('Unknown command: ' + obj[0])
  })

  return program
}
