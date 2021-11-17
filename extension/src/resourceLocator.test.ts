import { Uri } from 'vscode'
import { IconName, ResourceLocator } from './resourceLocator'

jest.mock('vscode')

describe('ResourceLocator', () => {
  it('should be able to find the dvcIcon', () => {
    const mockPath = Uri.file('some/path')
    const resourceLocator = new ResourceLocator(mockPath)

    const dark = Uri.file('some/path/resources/dark/dvc-color.svg')
    const light = Uri.file('some/path/resources/light/dvc-color.svg')

    expect(resourceLocator.dvcIcon).toEqual({
      dark,
      light
    })
  })

  it('should be able to find any experiments resource', () => {
    const mockPath = Uri.file('some/path')
    const resourceLocator = new ResourceLocator(mockPath)

    const redCircleFilled = Uri.file(
      'some/path/resources/experiments/circle-filled-#f14c4c.svg'
    )

    expect(
      resourceLocator.getExperimentsResource(IconName.CIRCLE_FILLED, '#f14c4c')
    ).toEqual(redCircleFilled)

    const redCircleOutline = Uri.file(
      'some/path/resources/experiments/circle-outline-#f14c4c.svg'
    )

    expect(
      resourceLocator.getExperimentsResource(IconName.CIRCLE_OUTLINE, '#f14c4c')
    ).toEqual(redCircleOutline)

    const blueSpinner = Uri.file(
      'some/path/resources/experiments/loading-spin-#3794ff.svg'
    )

    expect(
      resourceLocator.getExperimentsResource(IconName.LOADING_SPIN, '#3794ff')
    ).toEqual(blueSpinner)

    const yellowDot = Uri.file(
      'some/path/resources/experiments/debug-stackframe-dot-#cca700.svg'
    )

    expect(
      resourceLocator.getExperimentsResource(
        IconName.DEBUG_STACKFRAME_DOT,
        '#cca700'
      )
    ).toEqual(yellowDot)
  })
})
