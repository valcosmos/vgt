//监听全局异常监听，并打印日志
import { isDebug, log } from '../../utils/index.js'

function printErrorLog(e, type) {
  if (isDebug()) {
    // log.error(e)
    console.log(type, e)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', (e) => printErrorLog(e, 'Error'))

process.on('unhandledRejection', (e) => printErrorLog(e, 'Promise'))
