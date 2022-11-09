import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import fse from 'fs-extra'
import ora from 'ora'
import { log, printErrorLog } from '../utils/index.js'
import { execa } from 'execa'

function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules')
}

function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath)
  //判断路径是否存在，不存在就创建
  if (!pathExistsSync(cacheDir)) {
    //这个路径下任何一个路径不存在 就创建
    fse.mkdirpSync(cacheDir)
  }
}

async function downloadAddTemplate(targetPath, selectedTemplate) {
  const { npmName, version } = selectedTemplate
  const installCommand = 'npm'
  const installArgs = ['install', `${npmName}@${version}`]
  const cwd = targetPath
  log.verbose('installArgs', installArgs)
  log.verbose('cwd', cwd)
  await execa(installCommand, installArgs, { cwd })
}

export default async function downloadTemplate(selectedTemplate) {
  const { targetPath, template } = selectedTemplate
  makeCacheDir(targetPath)
  const spinner = ora('The template is downloading').start()
  try {
    await downloadAddTemplate(targetPath, template)
    spinner.stop()
    log.success('Template downloaded successfully')
  } catch (e) {
    spinner.stop()
    printErrorLog(e)
  }
}
