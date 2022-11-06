import urlJoin from 'url-join'
import axios from 'axios'
import { log } from './index.js'

function getNpmInfo(npmName) {
  const registry = 'https://registry.npmjs.org/'
  const url = urlJoin(registry, npmName)
  return axios.get(url).then((response) => {
    try {
      return response.data
    } catch (e) {
      return Promise.reject(e)
    }
  })
}

export function getLatestVersion(npmName) {
  return getNpmInfo(npmName).then((data) => {
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      log.error('没有latest版本号')
      return Promise.reject(new Error('没有latest版本号'))
    }
    return data['dist-tags'].latest
  })
}
