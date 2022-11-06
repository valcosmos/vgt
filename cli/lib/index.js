import createInitCommand from '../../init/index.js'

import './exception.js'

import createCLI from './createCLI.js'

export default function (args) {
  const program = createCLI()
  createInitCommand(program)
  program.parse(process.argv)
}
