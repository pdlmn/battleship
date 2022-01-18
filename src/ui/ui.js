const playerBoard = document.querySelector('#player-board')
const computerBoard = document.querySelector('#computer-board')

const createCell = (isHidden) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

const renderBoard = (board, isHidden) => {
  for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 10; i++) {
      board.append(createCell(isHidden))
    }
  }
}

renderBoard(playerBoard, false)
renderBoard(computerBoard, true)
