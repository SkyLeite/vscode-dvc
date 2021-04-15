import { EventEmitter, Pseudoterminal, Terminal, window } from 'vscode'
import { Commands } from './cli/commands'
import { execPromise } from './util'

const writeEmitter = new EventEmitter<string>()
export class PseudoTerminal {
  static termName = 'DVC'
  private static instance: Terminal | undefined

  static openCurrentInstance = async (): Promise<Terminal | undefined> => {
    if (!PseudoTerminal.instance) {
      await PseudoTerminal.initializeInstance()
    }
    PseudoTerminal.instance?.show(true)
    return PseudoTerminal.instance
  }

  static run = async (command: string): Promise<void> => {
    await PseudoTerminal.openCurrentInstance()
    writeEmitter.fire(`${command}\r\n`)
    const { stdout } = await execPromise(command)
    writeEmitter.fire(stdout)
    return writeEmitter.fire('\r\n')
  }

  static runCommand = async (command: string): Promise<void> => {
    return PseudoTerminal.run(`dvc ${command}`)
  }

  static dispose = (): void => {
    const currentTerminal = PseudoTerminal.instance
    if (currentTerminal) {
      currentTerminal.dispose()
      PseudoTerminal.instance = undefined
    }
  }

  private static initializeInstance = async (): Promise<void> => {
    PseudoTerminal.deleteReferenceOnClose()
    return PseudoTerminal.createInstance()
  }

  private static deleteReferenceOnClose = (): void => {
    window.onDidCloseTerminal(async event => {
      if (PseudoTerminal.instance && event.name === PseudoTerminal.termName) {
        PseudoTerminal.instance = undefined
      }
    })
  }

  private static createInstance = async (): Promise<void> =>
    new Promise<void>(resolve => {
      const pty: Pseudoterminal = {
        onDidWrite: writeEmitter.event,
        open: () => {
          writeEmitter.fire('>>>> DVC Terminal >>>>\r\n')
          resolve()
        },
        close: () => {},
        handleInput: data => writeEmitter.fire(data === '\r' ? '\r\n' : data)
      }

      PseudoTerminal.instance = window.createTerminal({
        name: PseudoTerminal.termName,
        pty
      })
    })
}

export const runExperiment = (): Promise<void> => {
  return PseudoTerminal.runCommand(Commands.EXPERIMENT_RUN)
}

export const runQueuedExperiments = (): Promise<void> => {
  return PseudoTerminal.runCommand(Commands.EXPERIMENT_RUN_ALL)
}
