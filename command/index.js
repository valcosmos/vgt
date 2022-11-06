class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance')
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    //执行命令之前的钩子
    cmd.hook('preAction', () => {
      this.preAction()
    })
    //执行命令之后的钩子
    cmd.hook('postAction', () => {
      this.postAction()
    })
    if (this.options?.length > 0) {
      this.options.forEach((option) => {
        cmd.option(...option)
      })
    }

    cmd.action((...params) => {
      this.action(params)
    })
  }

  get command() {
    throw new Error('command must be implements')
  }

  get description() {
    throw new Error('description must be implement')
  }

  get options() {
    return []
  }

  get action() {
    throw new Error('action must be implement')
  }

  preAction() {
    // console.log('pre')
  }

  postAction() {
    // console.log('post')
  }
}

// module.exports = Command

export default Command
