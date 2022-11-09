import Command from '../command/index.js'
import { log } from '../utils/index.js'
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'

/**
 * examples:
 *
 * vgt init
 * vgt init project-name -t project -tp vue3-template --force
 */
class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    return [
      [
        '-f, --force',
        'Whether to force creation, it will overwrite the directory with the same name',
        false
      ],
      // ['-v, --version', 'version check', false],
      ['-t, --type <type>', 'create type (project/page)'],
      ['-tp, --template <template>', 'template name']
    ]
  }

  async action([name, opts]) {
    // console.log('init', name, opts)
    log.verbose('init', name, opts)
    // 选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(name, opts)
    log.verbose('template==>', selectedTemplate)

    //  下载项目模板至缓存目录
    await downloadTemplate(selectedTemplate)
    //  安装项目模板至缓存目录
    await installTemplate(selectedTemplate, opts)
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

// module.exports = Init

export default Init
