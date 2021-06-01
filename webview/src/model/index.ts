import {
  ExperimentsRepoJSONOutput,
  MessageFromWebview,
  MessageFromWebviewType,
  MessageToWebview,
  MessageToWebviewType,
  WebviewColorTheme,
  WindowWithWebviewData
} from 'dvc/src/experiments/webview/contract'
import { Logger } from 'dvc/src/common/logger'
import { autorun, makeObservable, observable, runInAction } from 'mobx'
import { Disposable } from '@hediet/std/disposable'

import { getVsCodeApi, VsCodeApi as BaseVsCodeApi } from './vsCodeApi'

export type VsCodeApi = BaseVsCodeApi<
  PersistedModelState,
  MessageFromWebview,
  MessageToWebview
>

declare const window: Window & WindowWithWebviewData
/* eslint-disable @typescript-eslint/no-unused-vars */
declare let __webpack_public_path__: string

interface PersistedModelState {
  experiments?: ExperimentsRepoJSONOutput | null
  dvcRoot?: string
}

export class Model {
  private static instance: Model

  public readonly dispose = Disposable.fn()

  @observable
  public theme: WebviewColorTheme = WebviewColorTheme.light

  @observable
  public experiments?: ExperimentsRepoJSONOutput | null = null

  @observable
  public dvcRoot?: string

  public readonly vsCodeApi = getVsCodeApi<
    PersistedModelState,
    MessageFromWebview,
    MessageToWebview
  >()

  public errors?: Array<Error | string> = undefined

  private constructor() {
    makeObservable(this)
    const data = window.webviewData
    // this needs to be setup so that dynamic imports work
    __webpack_public_path__ = data.publicPath
    this.theme = data.theme

    this.dispose.track(
      this.vsCodeApi.addMessageHandler(message => this.handleMessage(message))
    )

    const state = this.vsCodeApi.getState()

    if (state) {
      this.setState(state)
    }

    this.sendMessage({ type: MessageFromWebviewType.initialized })

    this.dispose.track({
      dispose: autorun(() => {
        this.vsCodeApi.setState(this.getState())
      })
    })
  }

  public static getInstance(): Model {
    if (!Model.instance) {
      Model.instance = new Model()
    }
    return Model.instance
  }

  private getState(): PersistedModelState {
    return {
      dvcRoot: this.dvcRoot,
      experiments: this.experiments
    }
  }

  private setState(state: PersistedModelState) {
    this.experiments = state.experiments
    this.dvcRoot = state.dvcRoot
  }

  private sendMessage(message: MessageFromWebview): void {
    this.vsCodeApi.postMessage(message)
  }

  private handleMessage(message: MessageToWebview): void {
    this.errors = message.errors || undefined
    switch (message.type) {
      case MessageToWebviewType.setTheme:
        runInAction(() => {
          this.theme = message.theme
        })
        return
      case MessageToWebviewType.showExperiments:
        runInAction(() => {
          this.experiments = message.tableData
        })
        return
      case MessageToWebviewType.setDvcRoot:
        runInAction(() => {
          this.dvcRoot = message.dvcRoot
        })

        return
      default:
        Logger.error(`Unexpected message: ${message}`)
    }
  }
}
