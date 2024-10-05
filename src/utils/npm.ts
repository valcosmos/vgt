import axios from 'axios'
import urlJoin from 'url-join'
import { log } from './index'

function getNpmInfo(npmName: string) {
  const registry = 'https://registry.npmjs.org/'
  const url = urlJoin(registry, npmName)
  return axios.get(url).then((response) => {
    try {
      return response.data
    }
    catch (e) {
      return Promise.reject(e)
    }
  })
}

export function getLatestVersion(npmName: string) {
  return getNpmInfo(npmName).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('Error', '没有latest版本号')
      return Promise.reject(new Error('没有latest版本号'))
    }
    return data['dist-tags'].latest
  })
}
