import { PartialColumnDescriptor, PartialColumnsMap } from './collectFromRepo'
import { ColumnData } from './webview/contract'

const columnFromMapEntry = (
  entry: [string, PartialColumnDescriptor]
): ColumnData => {
  const [name, partialColumnDescriptor] = entry
  const { types, maxStringLength, minNumber, maxNumber } =
    partialColumnDescriptor
  const column: ColumnData = {
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
): ColumnData[] => {
  const currentLevelColumns = []
  for (const entry of columnsMap) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    currentLevelColumns.push(buildColumn(entry, ancestors))
  }
  return currentLevelColumns
}

export const transformAndCollectFromColumnsIfAny = (
  columnsMap: PartialColumnsMap
): ColumnData[] | undefined =>
  columnsMap.size === 0 ? undefined : transformAndCollectFromColumns(columnsMap)

const buildColumn = (
  entry: [string, PartialColumnDescriptor],
  ancestors?: string[]
): ColumnData => {
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
