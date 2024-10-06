import type { Command } from 'commander'
import { Option } from 'commander'
import CustomCommand from '../command'
import { log } from '../utils'
import createTemplate from './createTemplate'
import downloadTemplate from './downloadTemplate'
import installTemplate from './installTemplate'

interface InitOptions {
  force?: boolean
  type?: string
  template?: string
}

class InitCommand extends CustomCommand {
  get command(): string {
    return 'init [name]'
  }

  get description(): string {
    return 'init project'
  }

  get options(): Option[] {
    return [
      new Option('-f, --force', 'Whether to force creation, it will overwrite the directory with the same name').default(false),
      new Option('-t, --type <type>', 'create type (project/page)'),
      new Option('-tp, --template <template>', 'template name'),
    ]
  }

  async action(name: string, opts: InitOptions): Promise<void> {
    log.verbose('init', name, opts)

    try {
      // 选择项目模板，生成项目信息
      const selectedTemplate = await createTemplate(name, opts)
      log.verbose('template==>', selectedTemplate)

      // 下载项目模板至缓存目录
      await downloadTemplate(selectedTemplate)

      // 安装项目模板至缓存目录
      await installTemplate(selectedTemplate, opts)
    }
    catch (error) {
      log.error('Failed to initialize project:', error)
    }
  }
}

export default function createInitCommand(program: Command): void {
  // eslint-disable-next-line no-new
  new InitCommand(program)
}
