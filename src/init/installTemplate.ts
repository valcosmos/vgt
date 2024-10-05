import type { SelectedTemplate, Template } from './type.js'
import path from 'node:path'
import chalk from 'chalk'
import fse from 'fs-extra'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'
import { log } from '../utils/index.js'

function getCacheFilePath(targetPath: string, template: Template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}

function copyFile(targetPath: string, template: Template, installDir: string, name: string) {
  const originFile = getCacheFilePath(targetPath, template)
  // console.log(originFile)
  log.verbose('originFile', originFile)
  const fileList = fse.readdirSync(originFile)
  const spinner = ora('Template files are being copied...').start()
  fileList.map((file) => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  spinner.stop()

  log.success('Template has been successfully copied')

  console.log(`\n Scaffolding project in ${installDir}\n`)

  console.log(`\n Done. Now run: \n`)

  console.log(chalk.greenBright(`       cd ${name}`))
  console.log(chalk.greenBright(`       pnpm i`))
  console.log(chalk.greenBright(`       pnpm dev\n`))
}

export default function installTemplate(selectedTemplate: SelectedTemplate, opts: any) {
  const { force = false } = opts
  const { targetPath, name, template } = selectedTemplate
  const rootDir = process.cwd()
  // const {name} = template
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      return log.error(chalk.green(`The dir ==> **${installDir}**`), chalk.red('is already exists'))
    }
    else {
      fse.removeSync(installDir)
      fse.ensureDirSync(installDir)
    }
  }
  else {
    fse.ensureDirSync(installDir)
  }

  copyFile(targetPath, template, installDir, name)
}
