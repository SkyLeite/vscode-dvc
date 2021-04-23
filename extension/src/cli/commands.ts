export enum Commands {
  ADD = 'add',
  CHECKOUT = 'checkout',
  CHECKOUT_RECURSIVE = 'checkout --recursive',
  EXPERIMENT_GC = 'exp gc -f -w',
  EXPERIMENT_QUEUE = 'exp run --queue',
  EXPERIMENT_RUN = 'exp run',
  EXPERIMENT_RUN_RESET = 'exp run --reset',
  EXPERIMENT_RUN_ALL = 'exp run --run-all',
  EXPERIMENT_SHOW = 'exp show --show-json',
  EXPERIMENT_APPLY = 'exp apply',
  EXPERIMENT_BRANCH = 'exp branch',
  EXPERIMENT_REMOVE = 'exp remove',
  EXPERIMENT_LIST_NAMES_ONLY = 'exp list --names-only',
  INITIALIZE_SUBDIRECTORY = 'init --subdir',
  LIST = 'list .',
  PULL = 'pull',
  PUSH = 'push',
  ROOT = 'root',
  STATUS = 'status --show-json'
}

export enum ListFlag {
  DVC_ONLY = '--dvc-only',
  RECURSIVE = '-R'
}

export enum GcPreserveFlag {
  ALL_BRANCHES = '--all-branches',
  ALL_TAGS = '--all-tags',
  ALL_COMMITS = '--all-commits',
  QUEUED = '--queued'
}

export const buildCommand = (command: Commands, ...args: string[]): Commands =>
  [command, ...args].filter(Boolean).join(' ') as Commands
