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

}

export const boardHandler = (() => {
  let placedShips = 0
  let plane = 'horizontally'

  const renderBoard = (isHidden, board) => {
    for (let y = 1; y < 11; y++) {
      for (let x = 1; x < 11; x++) {
        board.append(_createCell(isHidden, y, x))
      }
    }
  }

  const place = (size, y, x, plane) => {}

  const setPlane = (newPlane) => { plane = newPlane }

  return {
    renderBoard,
    setPlane
  }
})()
