import log from 'npmlog'
import isDebug from './isDebug'

if (isDebug()) {
  // verbose 是调试级别的日志
  log.level = 'verbose'
}
else {
  log.level = 'info'
}

// 告诉别人你是什么脚手架
log.heading = 'vgt'

log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log
