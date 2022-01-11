import * as H from '../utils/func_helpers'

const Gameboard = () => {
  let board = new Array(100).fill(0)

  const fillVertically = H.replaceEveryNth(11, 1)

  const place = (ship) => {
    const { x, y } = ship.headCoords
    return {
      horizontally () {
        ship.tailCoords = { x, y: y + ship.size }
        for (let i = y; i < ship.tailCoords.y; ++i) {
          board[i] = 1
        }
      },

      vertically () {
        ship.tailCoords = { x: x + ship.size, y }
        // board = fillVertically(board)
        for (let i = x; i < ship.tailCoords.x * 10; i += 10) {
          board[i] = 1
        }
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
