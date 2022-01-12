import * as H from '../utils/func_helpers'

const Gameboard = () => {
  let board = new Array(100).fill(0)

  const place = (ship) => {
    const { x, y } = ship.headCoords
    return {
      horizontally () {
        const fillHorizontally = H.pipe(
          H.replaceAt(0, 1),

        )
        ship.tailCoords = { x, y: y + ship.size }
        for (let i = y - 1; i < ship.tailCoords.y - 1; ++i) {
          board[i] = 1
        }
      },

      vertically () {
        const fillVertically = H.pipe(
          H.replaceAt(0, 1),
          H.replaceEveryNth(11, 1, (y * 10 + 1))
        )
        ship.tailCoords = { x: x + ship.size, y }
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
