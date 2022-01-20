export const createCell = (isHidden) => {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  if (isHidden) cell.classList.add('fog-of-war')
  return cell
}

export const renderBoard = (isHidden, board) => {
  for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 10; i++) {
      board.append(createCell(isHidden))
    }
  }
}
