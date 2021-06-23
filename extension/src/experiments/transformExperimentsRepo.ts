import {
  collectFromRepo,
  ColumnCommon,
  PartialColumnDescriptor,
  PartialColumnsMap
} from './collectFromRepo'
import {
  ExperimentsRepoJSONOutput,
  ExperimentsBranch,
  ExperimentsWorkspace
} from './contract'

export interface Column extends ColumnCommon {
  name: string
  types?: string[]
  childColumns?: Column[]
  ancestors?: string[]
}

export interface TransformedExperiments {
  metrics?: Column[]
  params?: Column[]
  branches: ExperimentsBranch[]
  workspace: ExperimentsWorkspace
}

const columnFromMapEntry = (
  entry: [string, PartialColumnDescriptor]
): Column => {
  const [name, partialColumnDescriptor] = entry
  const { types, maxStringLength, minNumber, maxNumber } =
    partialColumnDescriptor
  const column: Column = {
    name
  }
  if (maxStringLength) {
    column.maxStringLength = maxStringLength
  }
  if (minNumber) {
    column.minNumber = minNumber
    column.maxNumber = maxNumber
  }
  if (types) {
    column.types = [...types]
  }
  return column
}

const transformAndCollectFromColumns = (
  columnsMap: PartialColumnsMap,
  ancestors?: string[]
): Column[] => {
  const currentLevelColumns = []
  for (const entry of columnsMap) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    currentLevelColumns.push(buildColumn(entry, ancestors))
  }
  return currentLevelColumns
}

const transformAndCollectFromColumnsIfAny = (
  columnsMap: PartialColumnsMap
): Column[] | undefined =>
  columnsMap.size === 0 ? undefined : transformAndCollectFromColumns(columnsMap)

const buildColumn = (
  entry: [string, PartialColumnDescriptor],
  ancestors?: string[]
): Column => {
  const finalColumn = columnFromMapEntry(entry)

  const [name, { childColumns }] = entry

  if (ancestors) {
    finalColumn.ancestors = ancestors
  }

  if (childColumns) {
    finalColumn.childColumns = transformAndCollectFromColumns(
      childColumns,
      ancestors ? [...ancestors, name] : [name]
    )
  }

  return finalColumn
}

export const transformExperimentsRepo = (
  tableData: ExperimentsRepoJSONOutput
): TransformedExperiments => {
  const { metricsMap, paramsMap, branches, workspace } =
    collectFromRepo(tableData)

  return {
    branches,
    metrics: transformAndCollectFromColumnsIfAny(metricsMap),
    params: transformAndCollectFromColumnsIfAny(paramsMap),
    workspace
  } as TransformedExperiments
}
