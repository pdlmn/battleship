import { repeat } from '../utils/func_helpers'

const _createCell = (isHidden) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

export const boardHandler = (() => {
  // const renderBoard = (isHidden, board) => {
  //   for (let i = 0; i < 100; i++) {
  //     board.append(_createCell(isHidden))
  //   }
  // }
  const renderBoard = (isHidden, board) => board.append(...repeat(() => _createCell(isHidden), 100))

  return {
    renderBoard
  }
})()
