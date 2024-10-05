import process from 'node:process'

export default function isDebug() {
  return process.argv.includes('--debug') || process.argv.includes('-d')
}
