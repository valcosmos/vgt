import createInitCommand from '@/init'

import createCLI from './createCLI'

import './exception'

export default function (argv: string[]) {
  const program = createCLI()
  createInitCommand(program)
  program.parse(argv)
}
