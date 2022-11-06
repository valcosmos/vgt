import fse from 'fs-extra'
import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import { log } from '../utils/index.js'
import ora from 'ora'

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template)
  console.log(originFile)
  const fileList = fse.readdirSync(originFile)
  const spinner = ora('正在拷贝模板文件')
  fileList.map((file) => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })

  spinner.stop()
  log.success('模板拷贝成功')
}

export default function installTemplate(selectedTemplate, opts) {
  const { force = false } = opts
  const { targetPath, name, template } = selectedTemplate
  const rootDir = process.cwd()
  // const {name} = template
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      return log.error(`当前目录下已存在${installDir}文件夹`)
    } else {
      fse.removeSync(installDir)
      fse.ensureDirSync(installDir)
    }
  } else {
    fse.ensureDirSync(installDir)
  }

  copyFile(targetPath, template, installDir)
}
