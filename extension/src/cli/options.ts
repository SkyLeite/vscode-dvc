import { dirname } from 'path'
import { Args } from './constants'
import { getCaseSensitiveCwd } from './cwd'
import { getProcessEnv } from '../env'
import { joinEnvPath } from '../util/env'

export type ExecutionOptions = {
  executable: string
  args: Args
  cwd: string
  env: NodeJS.ProcessEnv
}

export type ExecutionDetails = ExecutionOptions & { command: string }

const getPATH = (existingPath: string, pythonBinPath?: string): string => {
  const python = pythonBinPath ? dirname(pythonBinPath) : ''
  return joinEnvPath(python, existingPath)
}

const getEnv = (pythonBinPath?: string): NodeJS.ProcessEnv => {
  const env = getProcessEnv()
  const PATH = getPATH(env?.PATH as string, pythonBinPath)
  return {
    ...env,
    DVCLIVE_OPEN: 'false',
    DVC_NO_ANALYTICS: 'true',
    PATH
  }
}

const getArgs = (
  pythonBinPath: string | undefined,
  cliPath: string,
  ...args: Args
) => (!cliPath && pythonBinPath ? ['-m', 'dvc', ...args] : args)

const getExecutable = (pythonBinPath: string | undefined, cliPath: string) =>
  cliPath || pythonBinPath || 'dvc'

export const getOptions = (
  pythonBinPath: string | undefined,
  cliPath: string,
  cwd: string,
  ...originalArgs: Args
): ExecutionDetails => {
  const executable = getExecutable(pythonBinPath, cliPath)
  const args = getArgs(pythonBinPath, cliPath, ...originalArgs)
  return {
    args,
    command: [executable, ...args].join(' '),
    cwd: getCaseSensitiveCwd(cwd),
    env: getEnv(pythonBinPath),
    executable
  }
}
