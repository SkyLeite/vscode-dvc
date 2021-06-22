import { Disposer } from '@hediet/std/disposable'
import { commands, Uri } from 'vscode'

export const reRegisterVsCodeCommands = (disposer: Disposer) => {
  disposer.track(
    commands.registerCommand('dvc.copyFilePath', path =>
      commands.executeCommand('copyFilePath', Uri.file(path))
    )
  )

  disposer.track(
    commands.registerCommand('dvc.copyRelativeFilePath', path =>
      commands.executeCommand('copyRelativeFilePath', Uri.file(path))
    )
  )
}
