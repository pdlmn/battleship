import { pipe, repeat } from '../utils/func_helpers'

const _createCell = (isHidden, y, x) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  cell.dataset.y = y
  cell.dataset.x = x
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

const _shipPlacer = {
  horizontally () {}
}

export const boardHandler = (() => {
  const shipsToPlace = [5, 4, 3, 2]
  let plane = 'horizontally'

  const renderBoard = (isHidden, board) => {
    for (let y = 1; y < 11; y++) {
      for (let x = 1; x < 11; x++) {
        board.append(_createCell(isHidden, y, x))
      }
    }
  }

  const clearHighlights = () => document.querySelectorAll('.cell').forEach((el) => el.classList.remove('future-ship'))

  const highlightFutureShip = (cell) => {
    if (!shipsToPlace[0]) return
    clearHighlights()
    const nextShip = shipsToPlace[0]
    const y = Number(cell.dataset.y)
    const x = Number(cell.dataset.x)
    if (plane === 'horizontally') {
      const segments = []
      const tail = x + nextShip
      for (let i = x; i < tail; i++) {
        segments.push(document.querySelector(`:not([data-enemy])[data-y='${y}'][data-x='${i}']`))
      }
      segments.forEach((el) => el.classList.add('future-ship'))
    }
    if (plane === 'vertically') {

    }
  }

  const place = (size, y, x) => {}

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    renderBoard,
    setPlane,
    highlightFutureShip
  }
})()
