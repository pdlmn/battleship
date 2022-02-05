import { forEach, pipe, filter, curry } from '../utils/func_helpers'
import { addClass, clearElContent, removeClass } from './dom_funcs'
import { states } from '../constants/cell_states'

const _cellTable = {
  s: 'ship',
  w: 'water',
  h: 'hit',
  m: 'miss',
  x: 'sunk',
  a: 'around-sunk'
}

const _cellClasses = Object.values(_cellTable)

const _createCell = (isHidden, y, x) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.dataset.y = y
  cell.dataset.x = x
  cell.classList.add('water')
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

const _cellsFinder = {
  horizontally (y, x, size) {
    const segments = []
    const tail = x + size
    for (let i = x; i < tail; i++) {
      segments.push(document.querySelector(`[data-y='${y}'][data-x='${i}']`))
    }
    return segments
  },
  vertically (y, x, size) {
    const segments = []
    const tail = y + size
    for (let i = y; i < tail; i++) {
      segments.push(document.querySelector(`[data-y='${i}'][data-x='${x}']`))
    }
    return segments
  }
}

export const domBoard = (() => {
  let plane = 'horizontally'

  const extractCoords = (cell) =>
    [cell.dataset.y, cell.dataset.x].map(coord => Number(coord))

  const createBoard = (isHidden, domBoard) => {
    for (let y = 1; y < 11; y++) {
      for (let x = 1; x < 11; x++) {
        domBoard.append(_createCell(isHidden, y, x))
      }
    }
  }

  const recreateBoard = (isHidden, domBoard) => {
    clearElContent(domBoard)
    createBoard(isHidden, domBoard)
  }

  const renderBoard = curry((domBoard, isHidden, boardState) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cellState = boardState[i][j]
        const cellView = domBoard.querySelector(`[data-y='${i + 1}'][data-x='${j + 1}']`)
        if (!cellView.classList.contains(_cellTable[cellState])) addClass(_cellTable[cellState], cellView)
        if (isHidden && [states.MISSED, states.HIT, states.SUNK, states.AROUND_SUNK].includes(cellState)) {
          removeClass('fog-of-war', cellView)
        }
      }
    }
  })

  const clearHighlights = () => document.querySelectorAll('.cell')
    .forEach((el) => el.classList.remove('future-ship', 'wrong-placement'))

  const highlightFutureShip = (y, x, size, isValid) => {
    const className = (isValid) ? 'future-ship' : 'wrong-placement'
    const segments = _cellsFinder[plane](y, x, size)
    clearHighlights()
    const validCells = segments.filter((el) => Boolean(el))
    validCells.forEach((el) => addClass(className, el))
  }

  const place = (y, x, size) => {
    const segments = _cellsFinder[plane](y, x, size)
    segments.forEach((el) => addClass('ship', el))
  }

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    createBoard,
    recreateBoard,
    renderBoard,
    setPlane,
    extractCoords,
    highlightFutureShip,
    clearHighlights,
    place
  }
})()
