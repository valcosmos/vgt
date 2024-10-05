import type { Command, Option } from 'commander'

abstract class CustomCommand {
  protected program: Command

  constructor(instance: Command) {
    if (!instance) {
      throw new Error('Command instance is required')
    }
    this.program = instance
    this.initializeCommand()
  }

  private initializeCommand(): void {
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    cmd.hook('preAction', this.preAction.bind(this))
    cmd.hook('postAction', this.postAction.bind(this))

    this.options.forEach((option) => {
      cmd.addOption(option)
    })

    cmd.action(this.action.bind(this))
  }

  abstract get command(): string
  abstract get description(): string
  abstract action(...params: any[]): void | Promise<void>

  get options(): Option[] {
    return []
  }

  preAction(): void {
    // Override in subclasses if needed
  }

  postAction(): void {
    // Override in subclasses if needed
  }
}

export default CustomCommand
