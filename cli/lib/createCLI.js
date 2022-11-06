//用于读取json文件
import fse from 'fs-extra'

import path from 'node:path'

import { program } from 'commander'

import { dirname } from 'dirname-filename-esm'

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
    throw new Error(chalk.red(`vgt 需要安装 ${LOWER_NODE_VERSION}以上版本的Node.js`))
  }
}

function preAction() {
  //  检查node版本
  checkNodeVersion()
}

export default function createCLI() {
  log.info('version', pkg.version)

  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction)

  program.on('option:debug', function () {
    //是否开启了debug模式
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  program.on('command:*', function (obj) {
    log.error('未知的命令' + obj[0])
  })

  return program
}
