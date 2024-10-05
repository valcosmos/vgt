import { input, select } from '@inquirer/prompts'

export async function makeList(params: Parameters<typeof select>[0]) {
  return await select(params)
}

export async function makeInput(params: Parameters<typeof input>[0]) {
  return await input(params)
}
