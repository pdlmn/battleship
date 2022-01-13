import * as H from '../utils/func_helpers'

const Gameboard = () => {
  let board = Array(10).fill(Array(10).fill('w'))

  const place = (ship) => {
    const { x: headX, y: headY } = ship.headCoords
    return {
      horizontally () {
        const fillHorizontally = () => {}
        console.log(ship.headCoords)
        console.log(headX, headY)
        ship.tailCoords = { x: headX, y: headY + ship.size }
        console.log(ship.tailCoords)
        const { x: tailX, y: tailY } = ship.tailCoords
        console.log(tailY)
        console.log(tailX)
        board[headX - 1] = H.replaceEveryNth(1, headY-1, tailY-1, 's', board[headX - 1])
      },

      vertically () {
        const fillVertically = H.pipe(
          H.replaceAt(0, 1),
          H.replaceEveryNth(11, 1, (y * 10 + 1))
        )
        ship.tailCoords = { x: headX + ship.size, y: headY }
        const { tailX, tailY } = ship.tailCoords
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
