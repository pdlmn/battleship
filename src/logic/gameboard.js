import * as H from '../utils/func_helpers'

const createGameBoard = () => {
  const board = []
  for (let i = 0; i < 10; i++) {
    board[i] = []
    for (let j = 0; j < 10; j++) {
      board[i][j] = 'w'
    }
  }
  return board
}

const Gameboard = () => {
  let board = createGameBoard()

  const place = (ship) => {
    const { x: headX, y: headY } = H.decrement(ship.headCoords)
    return {
      horizontally () {
        ship.tailCoords = { x: headX + 1, y: headY + (ship.size) }
        const { y: tailY } = ship.tailCoords
        const fillHorizontally = H.replaceEveryNth(1, headY, tailY, 's')
        board[headX] = fillHorizontally(board[headX])
      },

      vertically () {
        ship.tailCoords = { x: headX + (ship.size), y: headY + 1 }
        const { x: tailX } = ship.tailCoords
        const fillVertically = (board) => {
          const result = [...board]
          for (let i = headX; i < tailX; i++) {
            result[i][headY] = 's'
          }
          return result
        }
        board = fillVertically(board)
      }
    }
  }

  const recieveAttack = () => {

  }

  return {
    get board () { return board },
    place
  }
}

export { Gameboard }
