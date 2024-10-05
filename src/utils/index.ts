import { makeInput, makeList } from './inquirer'
import isDebug from './isDebug'
import log from './log'
import { getLatestVersion } from './npm'

export function printErrorLog(e: any, type?: string) {
  if (isDebug()) {
    log.error(type ?? '', e)
  }
  else {
    log.error(type ?? '', e.message)
  }
}

export { getLatestVersion, isDebug, log, makeInput, makeList }
