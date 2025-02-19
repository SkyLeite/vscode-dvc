import { SortDefinition } from '../experiments/model/sortBy'
import { TableData } from '../experiments/webview/contract'
import {
  PlotsData,
  PlotSize,
  Section,
  SectionCollapsed,
  TemplatePlotGroup
} from '../plots/webview/contract'

export type WebviewData = TableData | PlotsData

export enum MessageFromWebviewType {
  INITIALIZED = 'initialized',
  APPLY_EXPERIMENT_TO_WORKSPACE = 'apply-experiment-to-workspace',
  CREATE_BRANCH_FROM_EXPERIMENT = 'create-branch-from-experiment',
  FOCUS_FILTERS_TREE = 'focus-filters-tree',
  FOCUS_SORTS_TREE = 'focus-sorts-tree',
  OPEN_PARAMS_FILE_TO_THE_SIDE = 'open-params-file-to-the-side',
  REMOVE_COLUMN_SORT = 'remove-column-sort',
  REMOVE_EXPERIMENT = 'remove-experiment',
  REORDER_COLUMNS = 'reorder-columns',
  REORDER_PLOTS_COMPARISON = 'reorder-plots-comparison',
  REORDER_PLOTS_METRICS = 'reorder-plots-metrics',
  REORDER_PLOTS_TEMPLATES = 'reorder-plots-templates',
  REFRESH_REVISION = 'refresh-revision',
  REFRESH_REVISIONS = 'refresh-revisions',
  RESIZE_COLUMN = 'resize-column',
  RESIZE_PLOTS = 'resize-plots',
  SORT_COLUMN = 'sort-column',
  TOGGLE_EXPERIMENT = 'toggle-experiment',
  HIDE_EXPERIMENTS_TABLE_COLUMN = 'hide-experiments-table-column',
  SELECT_EXPERIMENTS = 'select-experiments',
  SELECT_COLUMNS = 'select-columns',
  SELECT_PLOTS = 'select-plots',
  TOGGLE_METRIC = 'toggle-metric',
  TOGGLE_PLOTS_SECTION = 'toggle-plots-section',
  VARY_EXPERIMENT_PARAMS_AND_QUEUE = 'vary-experiment-params-and-queue',
  VARY_EXPERIMENT_PARAMS_AND_RUN = 'vary-experiment-params-and-run',
  VARY_EXPERIMENT_PARAMS_RESET_AND_RUN = 'vary-experiment-params-reset-and-run'
}

export type ColumnResizePayload = {
  id: string
  width: number
}
export type PlotsResizedPayload = { section: Section; size: PlotSize }
export type PlotSectionRenamedPayload = {
  section: Section
  name: string
}
export type PlotsTemplatesReordered = {
  group: TemplatePlotGroup
  paths: string[]
}[]

export type MessageFromWebview =
  | {
      type: MessageFromWebviewType.REORDER_COLUMNS
      payload: string[]
    }
  | {
      type: MessageFromWebviewType.RESIZE_COLUMN
      payload: ColumnResizePayload
    }
  | {
      type: MessageFromWebviewType.TOGGLE_EXPERIMENT
      payload: string
    }
  | {
      type: MessageFromWebviewType.HIDE_EXPERIMENTS_TABLE_COLUMN
      payload: string
    }
  | {
      type: MessageFromWebviewType.OPEN_PARAMS_FILE_TO_THE_SIDE
      payload: string
    }
  | {
      type: MessageFromWebviewType.APPLY_EXPERIMENT_TO_WORKSPACE
      payload: string
    }
  | {
      type: MessageFromWebviewType.CREATE_BRANCH_FROM_EXPERIMENT
      payload: string
    }
  | {
      type: MessageFromWebviewType.VARY_EXPERIMENT_PARAMS_AND_QUEUE
      payload: string
    }
  | {
      type: MessageFromWebviewType.VARY_EXPERIMENT_PARAMS_AND_RUN
      payload: string
    }
  | {
      type: MessageFromWebviewType.VARY_EXPERIMENT_PARAMS_RESET_AND_RUN
      payload: string
    }
  | {
      type: MessageFromWebviewType.REMOVE_EXPERIMENT
      payload: string
    }
  | {
      type: MessageFromWebviewType.SORT_COLUMN
      payload: SortDefinition
    }
  | {
      type: MessageFromWebviewType.REMOVE_COLUMN_SORT
      payload: string
    }
  | {
      type: MessageFromWebviewType.TOGGLE_METRIC
      payload: string[]
    }
  | {
      type: MessageFromWebviewType.REORDER_PLOTS_COMPARISON
      payload: string[]
    }
  | {
      type: MessageFromWebviewType.REORDER_PLOTS_METRICS
      payload: string[]
    }
  | {
      type: MessageFromWebviewType.RESIZE_PLOTS
      payload: PlotsResizedPayload
    }
  | {
      type: MessageFromWebviewType.TOGGLE_PLOTS_SECTION
      payload: Partial<SectionCollapsed>
    }
  | {
      type: MessageFromWebviewType.REORDER_PLOTS_TEMPLATES
      payload: PlotsTemplatesReordered
    }
  | { type: MessageFromWebviewType.INITIALIZED }
  | { type: MessageFromWebviewType.SELECT_EXPERIMENTS }
  | { type: MessageFromWebviewType.SELECT_PLOTS }
  | { type: MessageFromWebviewType.REFRESH_REVISION; payload: string }
  | { type: MessageFromWebviewType.REFRESH_REVISIONS; payload: string[] }
  | { type: MessageFromWebviewType.SELECT_COLUMNS }
  | { type: MessageFromWebviewType.FOCUS_FILTERS_TREE }
  | { type: MessageFromWebviewType.FOCUS_SORTS_TREE }

export type MessageToWebview<T extends WebviewData> = {
  type: MessageToWebviewType.SET_DATA
  data: T
}

export enum MessageToWebviewType {
  SET_DATA = 'setData'
}

export interface WebviewState {
  dvcRoot: string
}
