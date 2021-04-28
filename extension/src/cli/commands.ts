export enum Commands {
  ADD = 'add',
  CHECKOUT = 'checkout',
  COMMIT = 'commit',
  EXPERIMENT_GC = 'exp gc -f -w',
  EXPERIMENT_QUEUE = 'exp run --queue',
  EXPERIMENT = 'exp',
  EXPERIMENT_SHOW = 'exp show --show-json',
  EXPERIMENT_BRANCH = 'exp branch',
  EXPERIMENT_REMOVE = 'exp remove',
  INITIALIZE_SUBDIRECTORY = 'init --subdir',
  LIST = 'list .',
  PULL = 'pull',
  PUSH = 'push',
  ROOT = 'root',
  STATUS = 'status --show-json'
}

export enum ExperimentSubCommands {
  APPLY = 'apply',
  LIST = 'list',
  RUN = 'run',
  GARBAGE_COLLECT = 'gc'
}

export enum Flags {
  NAMES_ONLY = '--names-only',
  RESET = '--reset',
  RUN_ALL = '--run-all'
}

export enum ListFlag {
  DVC_ONLY = '--dvc-only',
  RECURSIVE = '-R'
}

export enum CommitFlag {
  FORCE = '-f'
}

export enum GcPreserveFlag {
  ALL_BRANCHES = '--all-branches',
  ALL_TAGS = '--all-tags',
  ALL_COMMITS = '--all-commits',
  QUEUED = '--queued'
}

export type Args = (Commands | ExperimentSubCommands | Flags)[]

export const buildArgs = (
  command: Commands | Args,
  ...args: string[]
): Args => {
  if (Array.isArray(command)) {
    return [...command, ...args].filter(Boolean) as Args
  }
  return [command, ...args].filter(Boolean) as Args
}
