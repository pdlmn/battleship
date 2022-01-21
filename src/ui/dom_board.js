import { pipe, repeat } from '../utils/func_helpers'

const _createCell = (isHidden) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

const _shipPlacer = {

}

export const boardHandler = (() => {
  let placedShips = 0

  const renderBoard = (isHidden, board) => 
    repeat(() => _createCell(isHidden), 100)
    .forEach((el) => board.append(el))

  const place = (size, y, x, horizontally) => {}

  return {
    renderBoard
  }
})()
