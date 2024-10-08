import type { SelectedTemplate, Template } from './type.js'
import { homedir } from 'node:os'
import path from 'node:path'
import { getLatestVersion, log, makeInput, makeList } from '../utils/index.js'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'
const ADD_TEMPLATE: Template[] = [
  {
    name: 'Vue3 template',
    value: 'vue3-template',
    npmName: '@valcosmos/vue3-template',
    version: '1.0.0',
  },
  {
    name: 'React18 template',
    value: 'react18-template',
    npmName: '@valcosmos/react18-template',
    version: '1.0.0',
  },
]
const TEMP_HOME = '.vgt-tmp'

const ADD_TYPE = [
  { name: 'Project', value: ADD_TYPE_PROJECT },
  { name: 'Page', value: ADD_TYPE_PAGE },
]

// 获取创建类型
async function getAddType() {
  return await makeList({
    choices: ADD_TYPE,
    message: 'Please select a creation type',
    default: ADD_TYPE_PROJECT,
  })
}

// 获取项目名称
async function getAddName() {
  return await makeInput({
    message: 'Please input the project name',
    default: '',
    validate(v) {
      return v.length > 0 || 'The project name is required'
    },
  })
}

// 选择项目模板
async function getAddTemplate() {
  return await makeList({
    choices: ADD_TEMPLATE,
    message: 'Please select the project template',
  })
}

// 安装缓存目录
function makeTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

export default async function createTemplate(name: string, opts: any): Promise<SelectedTemplate> {
  const { type = null, template = null } = opts
  // 创建的项目类型
  let addType: string
  // 创建的项目名称
  let addName: string
  // 创建的项目模板
  let selectedTemplate: Template
  if (type) {
    addType = type
  }
  else {
    addType = await getAddType() as string
  }
  log.verbose('addType', addType)
  if (addType === ADD_TYPE_PROJECT) {
    // const addName = await getAddName()
    if (name) {
      addName = name
    }
    else {
      addName = await getAddName() as string
    }
    log.verbose('addName', addName)

    if (template) {
      selectedTemplate = ADD_TEMPLATE.find(tp => tp.value === template)!
      if (!selectedTemplate) {
        throw new Error(`The project template **${template}** is doesn't exist`)
      }
    }
    else {
      const addTemplate = await getAddTemplate() as string
      selectedTemplate = ADD_TEMPLATE.find(_ => _.value === addTemplate)!
      // const addTemplate = await getAddTemplate()
      log.verbose('addTemplate', addTemplate)
    }

    // const selectedTemplate = ADD_TEMPLATE.find(_ => _.value === addTemplate)
    log.verbose('selectedTemplate', selectedTemplate)

    // 获取最新版本号
    const latestVersion = await getLatestVersion(selectedTemplate.npmName)
    log.verbose('latestVersion', latestVersion)
    selectedTemplate.version = latestVersion

    const targetPath = makeTargetPath()
    return {
      type: ADD_TYPE,
      name: addName,
      template: selectedTemplate,
      targetPath,
    }
  }
  else {
    throw new Error(`This type **${addType}** is not supported temporarily`)
  }
}
