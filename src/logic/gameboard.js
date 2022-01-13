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

const decrement = H.map((n) => n - 1)

const Gameboard = () => {
  let board = createGameBoard()

  const place = (ship) => {
    const { x: headX, y: headY } = ship.headCoords
    return {
      horizontally () {
        ship.tailCoords = { x: headX, y: headY + (ship.size - 1) }
        const { y: tailY } = ship.tailCoords
        const fillHorizontally = H.replaceEveryNth(1, headY - 1, tailY, 's')
        board[headX - 1] = fillHorizontally(board[headX - 1])
      },

      vertically () {
        ship.tailCoords = { x: headX + (ship.size - 1), y: headY }
        const { x: tailX } = ship.tailCoords
        const placeShipSegment = H.replaceAt(tailX - 1, 's')
        const fillVertically = (board) => {
          const result = [...board]
          for (let i = headX - 1; i < tailX; i++) {
            result[i][headY - 1] = 's'
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
