import * as H from '../utils/func_helpers'

const _createGameBoard = () => {
  const board = []
  for (let i = 0; i < 10; i++) {
    board[i] = []
    for (let j = 0; j < 10; j++) {
      board[i][j] = 'w'
    }
  }
  return board
}

const _fillRow = (headX, headY, tailY, board) => {
  const result = [...board]
  for (let i = headY; i < tailY; i++) {
    result[headX][i] = 's'
  }
  return result
}

const _fillColumn = (headX, tailX, headY, board) => {
  const result = [...board]
  for (let i = headX; i < tailX; i++) {
    result[i][headY] = 's'
  }
  return result
}


const Gameboard = () => {
  let board = _createGameBoard()

  const place = (ship) => {
    // decrement so that coords would match array indexes
    const { x: headX, y: headY } = H.decrement(ship.headCoords)
    return {
      horizontally () {
        ship.tailCoords = { x: headX + 1, y: headY + (ship.size) }
        const { y: tailY } = ship.tailCoords
        board = _fillRow(headX, headY, tailY, board)
      },

      vertically () {
        ship.tailCoords = { x: headX + (ship.size), y: headY + 1 }
        const { x: tailX } = ship.tailCoords
        board = _fillColumn(headX, tailX, headY, board)
      }
    }
  }

  const recieveAttack = (x, y) => {
    // decrement so that coords would match array indexes
    const [dx, dy] = H.decrement([x, y])
    
  }

  return {
    get board () { return board },
    place
  }
}

export { Gameboard }
